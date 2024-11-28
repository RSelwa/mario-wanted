import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    name: "unit",
    dir: "./tests/unit",
    exclude: ["**/tests/e2e/*.test.ts", "**/tests/e2e/**/*.spec.ts"], // Add this line to exclude Playwright tests
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"]
    }
  }
})
