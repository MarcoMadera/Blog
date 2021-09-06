export function isImgFromCloudProvider(src: string): boolean {
  return /https:\/\/res\.cloudinary\.com\/\w+\/image\/upload/.test(src);
}

export function replaceUrlImgTransformations(
  src: string,
  transformations: string
): string {
  const imageReplaced = src.replace(
    /(https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/?)\/?.*(\/v\d+\/.*)/g,
    `$1/${transformations}$2`
  );

  return imageReplaced;
}

export function getImageSizeFromCloudUrl(src: string): {
  width: string | undefined;
  height: string | undefined;
} {
  const regExp =
    /(?:https:\/\/res\.cloudinary\.com\/\w+\/image\/upload)\/?((?=.*(w_(?<width>\d+))+)(?=.*h_(?<height>\d+))[\w,]+)(?:\/v\d+\/.*)/g;
  const size = regExp.exec(src)?.groups;

  return {
    width: size?.width,
    height: size?.height,
  };
}
