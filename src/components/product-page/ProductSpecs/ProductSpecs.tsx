import { parseProductSpecs } from "@/functions/parseProductSpecs";
import styles from "./ProductSpecs.module.css";

type ProductSpecsProps = {
  description?: string;
};

const ProductSpecs = ({ description }: ProductSpecsProps) => {
  const specs = parseProductSpecs(description);
  if (!specs.length) return null;

  return (
    <table className={styles.table}>
      <caption>Характеристики</caption>
      <tbody>
        {specs.map((spec) => (
          <tr key={`${spec.label}-${spec.value}`}>
            <th scope="row">{spec.label}</th>
            <td>{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductSpecs;
