import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    exclude: ["bumpp.config.ts"],
  },
});
