/* eslint-disable no-console */
/**
 * @vitest-environment node
 */

import { describe, it } from "vitest";
import { load } from "./autoLoader";
import { LoaderType } from "./type";

describe("autoLoader", () => {
  it("should load a module", async () => {
    const assets = await load<
      typeof import("../../../fixtures/files/dts/test.mts")
    >("fixtures/files/test.cjs", __filename);
    if (assets.success === false) throw assets.error;

    if (assets.data.type === LoaderType.Webpack) return void 0;

    console.log(assets.data.value);
  });
});
