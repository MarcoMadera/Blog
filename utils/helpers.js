import { siteMetadata } from "../site.config";

export function getSiteMetaData() {
  return siteMetadata;
}
export function getFormattedDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es", options);
  return formattedDate;
}
