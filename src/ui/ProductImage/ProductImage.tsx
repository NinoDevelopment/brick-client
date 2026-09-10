import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const ProductImage = ({
  src,
  alt,
  className,
  width = 800,
  height = 520,
}: ProductImageProps) => {
  if (src.startsWith("data:") || src.startsWith("blob:")) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ProductImage;
