import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SITE_NAME,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  {
    title: `Админ-панель | ${SITE_NAME}`,
    description: "Служебный раздел сайта.",
  },
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
