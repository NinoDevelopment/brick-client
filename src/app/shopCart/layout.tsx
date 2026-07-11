import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SEO_SHOP_CART,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_SHOP_CART,
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

export default function ShopCartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
