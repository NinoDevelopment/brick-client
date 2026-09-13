import { serializeJsonLd } from "@/functions/serializeJsonLd";

type JsonLdProps = {
  id: string;
  data: unknown;
};

const JsonLd = ({ id, data }: JsonLdProps) => (
  <script
    id={id}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default JsonLd;
