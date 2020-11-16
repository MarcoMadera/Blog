import { siteMetadata } from "../site.config";

export function getSiteMetaData() {
  return siteMetadata;
}
export function getFormattedDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = date.toLocaleDateString("es", options);
  return formattedDate;
}

export function formatNumber(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const numberBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
