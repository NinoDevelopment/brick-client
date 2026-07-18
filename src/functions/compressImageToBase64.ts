const MAX_SIDE = 1600;
const JPEG_QUALITY = 0.82;

const drawToJpeg = (image: HTMLImageElement): string => {
  const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Не удалось обработать изображение");
  }

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Не удалось прочитать изображение"));
    image.src = src;
  });

export const compressImageToBase64 = async (file: Blob): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Файл не является изображением");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl);
    return drawToJpeg(image);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

export const compressImageSrc = async (src: string): Promise<string> => {
  if (!src.startsWith("data:image/")) {
    return src;
  }

  const image = await loadImage(src);
  return drawToJpeg(image);
};

export const compressImageList = async (images: string[]): Promise<string[]> => {
  const result: string[] = [];
  for (const image of images) {
    result.push(await compressImageSrc(image));
  }
  return result;
};
