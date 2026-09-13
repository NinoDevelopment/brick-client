import Script from "next/script";
import { serializeJsonLd } from "@/functions/serializeJsonLd";

type JsonLdProps = {
  id: string;
  data: unknown;
};

const JsonLd = ({ id, data }: JsonLdProps) => (
  <Script
    id={id}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default JsonLd;
