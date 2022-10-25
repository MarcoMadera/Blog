/**
 * Add opacity to hex color
 * @param {string} hex - Hex color code
 * @param {number} opacity - Opacity value between 0 and 1
 */
export function addOpacityToHexColor(
  hexColor: string,
  opacity: number
): string {
  const hexColorWithOpacity = `${hexColor}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return hexColorWithOpacity;
}
