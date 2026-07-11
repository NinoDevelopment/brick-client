import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SITE_NAME,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  {
    title: `Статус заказа | ${SITE_NAME}`,
    description: "Статус оформления и оплаты заказа.",
  },
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

export default function OrderStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
