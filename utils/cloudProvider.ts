export function isImgFromCloudProvider(src: string): boolean {
  return /https:\/\/res\.cloudinary\.com\/\w+\/image\/upload/.test(src);
}

export function getTrasnformationsFromUrl(src: string): string {
  const regex =
    /(https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/)((?:[\w-]*_[\w-]*,*)*)(\/*.*)/;
  const transformations = src.match(regex);
  return transformations?.[2] ?? "";
}

export function replaceUrlImgTransformations(
  src: string,
  transformations: string
): string {
  const currentTransformations = getTrasnformationsFromUrl(src);
  if (currentTransformations) {
    return src.replace(currentTransformations, transformations);
  }

  const imageReplaced = src.replace(
    /(https:\/\/res\.cloudinary\.com\/\w+\/image\/upload\/)(\/*.*)/g,
    `$1${transformations}/$2`
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
