import CategoryProducts from "@/components/catalog-page/CategoryProducts/CategoryProducts";
import { Container } from "react-bootstrap";
import CatalogBanner from "@/components/catalog-page/CatalogBanner/CatalogBanner";

const CatalogPage = () => {
  return (
    <>
      <CatalogBanner />
      <Container>
        <CategoryProducts />
      </Container>
    </>
  );
};

export default CatalogPage;
