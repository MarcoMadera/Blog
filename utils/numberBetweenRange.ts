/**
 * Return a number between two numbers
 * @param {number} min 10
 * @param {number} max 20
 * @returns {number} 14
 */
export default function numberBetweenRange(min: number, max: number): number {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
