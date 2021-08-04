const months = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/**
 *
 * @param {date} date
 * @returns string 08:24 AM
 */
function formatAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  return strTime;
}

/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 20 may 2020
 */
export function getFormattedDate(date: string): string {
  const d = new Date(date);
  const month = months[d.getUTCMonth()];
  return `${d.getUTCDate()} ${month}. ${d.getUTCFullYear()}`;
}
/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 4:30pm - may 13, 2020
 */
export function getTwitterFormattedDate(d: string): string {
  const date = new Date(d);
  const month = months[date.getMonth()];
  return `${formatAMPM(
    date
  )} - ${month} ${date.getDate()}, ${date.getFullYear()}`;
}
/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 20 abr
 */
export function getQuotedTwitterFormattedDate(d: string): string {
  const date = new Date(d);
  const month = months[date.getMonth()];
  return `${date.getDate()} ${month}`;
}

/**
 * Format a number with commas
 * @param {number} n 928392382
 * @returns {string} string 928,392,382
 */
export function formatNumber(n: number): string {
  return n?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/**
 * Return a number between two numbers
 * @param {number} min 10
 * @param {number} max 20
 * @returns {number} 14
 */
export function numberBetween(min: number, max: number): number {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function insertTextBetween(
  str: string,
  index: number,
  value: string
): string {
  return str.substr(0, index) + value + str.substr(index);
}
