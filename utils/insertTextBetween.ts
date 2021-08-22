export default function insertTextBetween(
  str: string,
  index: number,
  value: string
): string {
  return str.substr(0, index) + value + str.substr(index);
}
