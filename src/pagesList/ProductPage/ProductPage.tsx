"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCT_ID, API_PRODUCT_IMG } from "@/constants/api";
import { Container } from "react-bootstrap";
import { LINK_CATALOG, LINK_ERROR } from "@/constants/links";
import { redirect } from "next/navigation";
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
}

const ProductPage = ({
  initialProduct,
  initialImages,
  initialRelatedProducts,
}: IProductPage) => {
  const params = useParams();
  const productId = params._id as string;
  const hasInitialData = Boolean(initialProduct);

  const { data: fetchedProduct, error, load } = useFetch<IProductId>(
    API_PRODUCT_ID(productId),
    REQUEST_METHODS.GET,
    {},
    false,
    !hasInitialData,
  );
  const { data: fetchedImages } = useFetch<IProductImg>(
    API_PRODUCT_IMG(productId),
    REQUEST_METHODS.GET,
    {},
    false,
    !hasInitialData,
  );

  const data = fetchedProduct ?? initialProduct;
  const images = fetchedImages ?? initialImages ?? null;

  if (!hasInitialData && load) {
    return (
      <Container className={styles.spinnerContainer}>
        <SpinnerPrimary />
      </Container>
    );
  }

  if (error && !data) redirect(LINK_ERROR);

  if (!data) {
    return null;
  }

  return (
    <Container className={styles.main}>
      <BackLink link={LINK_CATALOG} text={"В каталог"} />

      <div className={styles.productData}>
        <div className={styles.sliderContainer}>
          <SwiperPhoto images={images?.images} />
        </div>

        <div className={styles.dataContainer}>
          <ProductInfo data={data} />
        </div>
      </div>

      <RandomProducts quantity={3} initialProducts={initialRelatedProducts} />
    </Container>
  );
};

export default ProductPage;
