/**
 * Get the actual space used in screen based on the innerHeight and innerWidth
 *
 * Ex. Screen = 1349 x 671
 * getClientSize(4000,2000)=>{widthPercent:100, heightPercent:50}
 *
 * @param width number
 * @param height number
 * @returns :{ widthPercent:number, heightPercent:number, }
 */

export default function getClientSize(
  width: number,
  height: number
): {
  widthPercent: number;
  heightPercent: number;
} {
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const heightRatio = height / screenHeight;
  const widthRatio = width / screenWidth;

  if (
    (heightRatio > 1 && widthRatio < 1) ||
    (heightRatio > 1 && widthRatio > 1 && heightRatio > widthRatio)
  ) {
    return {
      widthPercent: (widthRatio / heightRatio) * 100,
      heightPercent: 100,
    };
  }

  if (
    (heightRatio < 1 && widthRatio > 1) ||
    (heightRatio > 1 && widthRatio > 1 && heightRatio < widthRatio)
  ) {
    return {
      widthPercent: 100,
      heightPercent: (heightRatio / widthRatio) * 100,
    };
  }

  return {
    widthPercent: widthRatio * 100,
    heightPercent: heightRatio * 100,
  };
}
