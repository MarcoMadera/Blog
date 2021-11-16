import { camelize } from "./camelize";

export default function convertInlineStylesToObject(
  style: string
): Record<string, string> {
  if (typeof style !== "string") return {};
  const styleObject = style
    .split(";")
    .filter((s) => s.length)
    .reduce((a: Record<string, string>, b) => {
      const keyValue = b.split(":");
      a[camelize(keyValue[0])] = keyValue[1];
      return a;
    }, {});
  return styleObject;
}
