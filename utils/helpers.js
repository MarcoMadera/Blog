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

/**
 * Get the formatted date
 * @param {date} date a date
 * @returns formatted date in form 20 may 2020
 */
export function getFormattedDate(date) {
  const d = new Date(date);
  const month = months[d.getUTCMonth()];
  return `${d.getUTCDate()} ${month} ${d.getUTCFullYear()}`;
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
