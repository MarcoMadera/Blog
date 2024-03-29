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
  width: number | undefined;
  height: number | undefined;
} {
  const transformations = getTrasnformationsFromUrl(src);
  const widthMatch = /w_(\d+)/.exec(transformations);
  const heightMatch = /h_(\d+)/.exec(transformations);
  const width = widthMatch ? parseInt(widthMatch[1], 10) : undefined;
  const height = heightMatch ? parseInt(heightMatch[1], 10) : undefined;

  if ((width && isNaN(width)) || (height && isNaN(height))) {
    return {
      width: undefined,
      height: undefined,
    };
  }

  return {
    width,
    height,
  };
}
