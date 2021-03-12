import { siteMetadata } from "../site.config";

export function getSiteMetaData() {
  return siteMetadata;
}

const months = {
  0: "ene.",
  1: "feb.",
  2: "mar.",
  3: "abr.",
  4: "may.",
  5: "jun.",
  6: "jul.",
  7: "ago.",
  8: "sep.",
  9: "oct.",
  10: "nov.",
  11: "dic.",
};

export function getFormattedDate(d) {
  const date = new Date(d);
  const month = months[date.getUTCMonth()];
  return `${date.getUTCDate()} ${month} ${date.getUTCFullYear()}`;
}

export function formatNumber(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function numberBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function insertTextBetween(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
