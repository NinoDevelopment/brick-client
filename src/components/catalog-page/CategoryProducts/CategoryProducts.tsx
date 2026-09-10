import CategoryProductsList from "@/components/catalog-page/CategoryProducts/components/CategoryProductsList/CategoryProductsList";
import styles from "./CategoryProducts.module.css";
import { IProductId } from "@/types/products";
import { CatalogCategoryRef } from "@/functions/serverFetch";

interface ICategoryProducts {
  initialProducts?: IProductId[];
  categorySlug?: string | null;
  categories?: CatalogCategoryRef[];
}

const CategoryProducts = ({
  initialProducts,
  categorySlug = null,
  categories,
}: ICategoryProducts) => {
  return (
    <div className={styles.wrapper}>
      <CategoryProductsList
        initialProducts={initialProducts}
        categorySlug={categorySlug}
        categories={categories}
      />
    </div>
  );
};

export default CategoryProducts;
