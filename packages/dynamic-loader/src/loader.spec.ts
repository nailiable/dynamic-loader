/* eslint-disable no-console */
/**
 * @vitest-environment node
 */

import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as loader from "./loader";
import { LoaderType } from "./type";

describe("loader", () => {
  describe("load a module use require", () => {
    it("should load a commonjs module", () => {
      const result = loader.loadRequire(
        join(process.cwd(), "fixtures/files/test.cjs")
      );
      if (result.success === true) {
        expect(result.data.type).toBe(LoaderType.Require);
        console.log(result.data);
      } else {
        console.log(result.error);
      }
      expect(result.success).toBe(true);
    });

    it("should throw an error when loading a non-existent module", () => {
      const result = loader.loadRequire(
        join(process.cwd(), "fixtures/files/test1.cjs")
      );
      expect(result.success).toBe(false);
    });
  });

  describe("load a module use import", () => {
    it("should load an es module", async () => {
      const result = await loader.loadImport(
        join(process.cwd(), "fixtures/files/test.mjs")
      );
      if (result.success === true) {
        expect(result.data.type).toBe(LoaderType.Import);
        console.log(result.data);
      } else {
        console.log(result.error);
      }
      expect(result.success).toBe(true);
    });
    it("should throw an error when loading a non-existent module", async () => {
      const result = await loader.loadImport(
        join(process.cwd(), "fixtures/files/test1.mjs")
      );
      expect(result.success).toBe(false);
    });
  });

  describe("load a module use jiti", () => {
    it("should load a jiti module", async () => {
      const result = await loader.loadJiti(
        join(process.cwd(), "fixtures/files/test.cjs"),
        __filename
      );
      if (result.success === true) {
        expect(result.data.type).toBe(LoaderType.Jiti);
        console.log(result.data);
      } else {
        console.log(result.error);
      }
      expect(result.success).toBe(true);
    });

    it("should throw an error when loading a non-existent module", async () => {
      const result = await loader.loadJiti(
        join(process.cwd(), "fixtures/files/test1.cjs"),
        __filename
      );
      expect(result.success).toBe(false);
    });
  });

  it("should throw error because not in webpack environment", async () => {
    const result = await loader.loadWebpack(
      join(process.cwd(), "fixtures/files/test.cjs")
    );
    expect(result.success).toBe(false);
  });
});
