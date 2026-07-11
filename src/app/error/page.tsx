import NotFoundContent from "@/components/not-found-page/NotFoundContent/NotFoundContent";
import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SITE_NAME,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  {
    title: `Страница не найдена | ${SITE_NAME}`,
    description: "Запрашиваемая страница не существует.",
  },
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

const page = () => {
  return <NotFoundContent />;
};

export default page;
