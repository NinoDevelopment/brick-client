import CategoryProducts from "@/components/catalog-page/CategoryProducts/CategoryProducts";
import { Container } from "react-bootstrap";
import CatalogBanner from "@/components/catalog-page/CatalogBanner/CatalogBanner";
import { IProductId } from "@/types/products";

interface ICatalogPage {
  initialProducts?: IProductId[];
}

const CatalogPage = ({ initialProducts }: ICatalogPage) => {
  return (
    <>
      <CatalogBanner />
      <Container>
        <CategoryProducts initialProducts={initialProducts} />
      </Container>
    </>
  );
};

export default CatalogPage;
