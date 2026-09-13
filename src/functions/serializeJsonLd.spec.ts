import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { serializeJsonLd } from "./serializeJsonLd.ts";

describe("serializeJsonLd", () => {
  it("keeps ordinary SEO JSON unchanged", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Кирпич керамический",
      description: "Формат 1NF. Размер 250x120x65",
    };

    assert.equal(serializeJsonLd(data), JSON.stringify(data));
    assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
  });

  it("prevents script breakout from admin-controlled values", () => {
    const data = {
      "@type": "Product",
      name: '</script><script>alert(1)</script>',
      description: "Размер < 250 и цена > 10 & акция",
    };

    const html = serializeJsonLd(data);

    assert.equal(html.includes("</script>"), false);
    assert.equal(html.includes("<script>"), false);
    assert.equal(html.includes("<!--"), false);
    assert.equal(html.includes("<"), false);
    assert.equal(html.includes("\\u003c/script\\u003e"), true);
    assert.deepEqual(JSON.parse(html), data);
  });
});
