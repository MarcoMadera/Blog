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
export function formatAMPM(date: Date): string {
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
export function getFormattedDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const month = months[d.getUTCMonth()];
  return `${d.getUTCDate()} ${month}. ${d.getUTCFullYear()}`;
}

/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 4:30pm - 13 may, 2020
 */
export function getTwitterFormattedDate(d: string): string {
  const date = new Date(d);
  const month = months[date.getMonth()];
  return `${formatAMPM(
    date
  )} - ${date.getDate()} ${month}, ${date.getFullYear()}`;
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
