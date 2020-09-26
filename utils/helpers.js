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
