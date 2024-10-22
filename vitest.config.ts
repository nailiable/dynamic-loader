import { defineConfig } from "vitest/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // or 'v8',
      enabled: true,
      reporter: ["text", "html", "clover", "json"],
      exclude: [
        "**/node_modules/**",
        "**/*.mjs",
        "**/*.cjs",
        "**/lib/**",
        "bumpp.config.ts",
        "**/*.d.ts",
      ],
    },
    globals: true,
    exclude: ["bumpp.config.ts"],
  },
});
