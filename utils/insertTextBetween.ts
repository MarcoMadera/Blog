export default function insertTextBetween(
  str: string,
  index: number,
  value: string
): string {
  return str.slice(0, index) + value + str.slice(index);
}
