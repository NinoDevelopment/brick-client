import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildBackendProxyUrl } from "./backendProxy.ts";

describe("buildBackendProxyUrl", () => {
  it("maps browser auth to the stripped Nest /api/auth route", () => {
    assert.equal(
      buildBackendProxyUrl(["api", "auth"]),
      "https://kzk.ooo/api/api/auth",
    );
  });

  it("maps product images without colliding with /api-proxy", () => {
    assert.equal(
      buildBackendProxyUrl(["item", "images", "663b939ac3072a88d0905548"]),
      "https://kzk.ooo/api/item/images/663b939ac3072a88d0905548",
    );
  });
});
