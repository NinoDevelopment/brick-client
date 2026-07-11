import OrderForm from "@/components/order-page/OrderForm/OrderForm";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import BackLink from "@/ui/BackLink/BackLink";
import { LINK_SHOP_CART } from "@/constants/links";
import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SEO_ORDER,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_ORDER,
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

const Page = () => {
  return (
    <Container className={styles.main}>
      <BackLink link={LINK_SHOP_CART} text={"В корзину"} />

      <OrderForm />
    </Container>
  );
};

export default Page;
