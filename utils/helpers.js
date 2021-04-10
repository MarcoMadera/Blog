const months = {
  0: "ene",
  1: "feb",
  2: "mar",
  3: "abr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "ago",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dic",
};

/**
 *
 * @param {date} date
 * @returns string 08:24 AM
 */
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 20 may 2020
 */
export function getFormattedDate(date) {
  const d = new Date(date);
  const month = months[d.getUTCMonth()];
  return `${d.getUTCDate()} ${month}. ${d.getUTCFullYear()}`;
}
/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 20 may 2020
 */
export function getTwitterFormattedDate(d) {
  const date = new Date(d);
  const month = months[date.getMonth()];
  return `${formatAMPM(
    date
  )} - ${month} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format a number with commas
 * @param {number} n 928392382
 * @returns {string} string 928,392,382
 */
export function formatNumber(n) {
  return n?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/**
 * Return a number between two numbers
 * @param {number} min 10
 * @param {number} max 20
 * @returns {number} 14
 */
export function numberBetween(min, max) {
  if (isNaN(min) || isNaN(max)) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function insertTextBetween(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}
