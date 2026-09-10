"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCT_ID, API_PRODUCT_IMG } from "@/constants/api";
import { Container } from "react-bootstrap";
import { LINK_CATALOG, LINK_ERROR } from "@/constants/links";
import { IProductId, IProductImg } from "@/types/products";
import SwiperPhoto from "@/components/product-page/SwiperPhoto/SwiperPhoto";
import ProductInfo from "@/components/product-page/ProductInfo/ProductInfo";
import styles from "./ProductPage.module.css";
import { REQUEST_METHODS } from "@/types/general";
import BackLink from "@/ui/BackLink/BackLink";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import RandomProducts from "@/components/general/RandomProducts/RandomProducts";

interface IProductPage {
  initialProduct?: IProductId;
  initialImages?: IProductImg | null;
  initialRelatedProducts?: IProductId[];
  categoryName?: string;
  categorySlug?: string;
  catalogHref?: string;
}

const ProductPage = ({
  initialProduct,
  initialImages,
  initialRelatedProducts,
  categoryName,
  categorySlug,
  catalogHref = LINK_CATALOG,
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
  const { data: fetchedImages } = useFetch<IProductImg>(
    API_PRODUCT_IMG(productId || ""),
    REQUEST_METHODS.GET,
    {},
    false,
    Boolean(productId) && initialImages == null,
  );

  const data = fetchedProduct ?? initialProduct;
  const images = fetchedImages ?? initialImages ?? null;

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
      <BackLink link={catalogHref} text={"В каталог"} />

      <div className={styles.productData}>
        <div className={styles.sliderContainer}>
          <SwiperPhoto images={images?.images} name={data.name} />
        </div>

        <div className={styles.dataContainer}>
          <ProductInfo
            data={data}
            categoryName={categoryName}
            categorySlug={categorySlug}
          />
        </div>
      </div>

      <RandomProducts quantity={3} initialProducts={initialRelatedProducts} />
    </Container>
  );
};

export default ProductPage;
