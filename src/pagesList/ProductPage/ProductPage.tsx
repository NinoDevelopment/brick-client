"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCT_ID, API_PRODUCT_IMG } from "@/constants/api";
import { Container } from "react-bootstrap";
import Link from "next/link";
import {
  LINK_CATALOG,
  LINK_CATALOG_CATEGORY,
  LINK_ERROR,
  LINK_HOME,
} from "@/constants/links";
import { IProductId, IProductImg } from "@/types/products";
import SwiperPhoto from "@/components/product-page/SwiperPhoto/SwiperPhoto";
import ProductInfo from "@/components/product-page/ProductInfo/ProductInfo";
import styles from "./ProductPage.module.css";
import { REQUEST_METHODS } from "@/types/general";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import RandomProducts from "@/components/general/RandomProducts/RandomProducts";
import { getEmbeddedProductImages } from "@/functions/productImages";

interface IProductPage {
  initialProduct?: IProductId;
  initialImages?: IProductImg | null;
  initialRelatedProducts?: IProductId[];
  categoryName?: string;
  categorySlug?: string;
  catalogHref?: string;
  heading?: string;
}

const ProductPage = ({
  initialProduct,
  initialImages,
  initialRelatedProducts,
  categoryName,
  categorySlug,
  catalogHref = LINK_CATALOG,
  heading,
}: IProductPage) => {
  const router = useRouter();
  const productId = initialProduct?._id;
  const hasInitialData = Boolean(initialProduct);

  const { data: fetchedProduct, error, load } = useFetch<IProductId>(
    API_PRODUCT_ID(productId || ""),
    REQUEST_METHODS.GET,
    {},
    false,
    !hasInitialData && Boolean(productId),
  );
  const data = fetchedProduct ?? initialProduct;
  const embeddedImages = getEmbeddedProductImages(data);
  const skipImageFetch =
    initialImages != null || embeddedImages !== undefined;
  const { data: fetchedImages } = useFetch<IProductImg>(
    API_PRODUCT_IMG(productId || ""),
    REQUEST_METHODS.GET,
    {},
    false,
    Boolean(productId) && !skipImageFetch,
  );

  const images =
    initialImages ??
    (embeddedImages !== undefined
      ? { _id: data?._id ?? "", images: embeddedImages }
      : fetchedImages);

  useEffect(() => {
    if (error && !data) {
      router.replace(LINK_ERROR);
    }
  }, [error, data, router]);

  if ((!hasInitialData && load) || (error && !data)) {
    return (
      <Container className={styles.spinnerContainer}>
        <SpinnerPrimary />
      </Container>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Container className={styles.main}>
      <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
        <Link href={LINK_HOME}>Главная</Link>
        <span aria-hidden="true"> / </span>
        {categorySlug && categoryName ? (
          <Link href={LINK_CATALOG_CATEGORY(categorySlug)}>{categoryName}</Link>
        ) : (
          <Link href={LINK_CATALOG}>Каталог</Link>
        )}
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{data.name}</span>
      </nav>

      <div className={styles.productData}>
        <div className={styles.sliderContainer}>
          <SwiperPhoto images={images?.images} name={data.name} />
        </div>

        <div className={styles.dataContainer}>
          <ProductInfo
            data={data}
            categoryName={categoryName}
            categorySlug={categorySlug}
            heading={heading}
          />
        </div>
      </div>

      <RandomProducts
        title={
          categoryName
            ? `Другой ${categoryName.toLowerCase()} кирпич`
            : "Похожие товары"
        }
        quantity={3}
        initialProducts={initialRelatedProducts}
        moreHref={catalogHref}
      />
    </Container>
  );
};

export default ProductPage;
