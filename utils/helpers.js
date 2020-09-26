import { siteMetadata } from "../site.config";

export function getSiteMetaData() {
  return siteMetadata;
}
export function getFormattedDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString(siteMetadata.language, options);
  return formattedDate;
}
