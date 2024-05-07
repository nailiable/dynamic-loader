import { join } from "node:path";
import { describe, it } from "vitest";
import { dtsGenerate } from "./dtsGenerate";

describe("dtsGenerate", () => {
  it.skip("should generate dts file", () => {
    const path = join(process.cwd(), "fixtures/files/test.mjs");
    dtsGenerate(path, join(process.cwd(), "fixtures/files/dts"));
  });
});
