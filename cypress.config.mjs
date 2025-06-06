import { defineConfig } from "cypress";
import { devServer } from "@cypress/vite-dev-server";
import { loadConfigFromFile } from "vite";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      async viteConfig() {
        const { config } = await loadConfigFromFile({
          command: "serve",
          mode: "test",
        });
        return config;
      },
    },
    specPattern: "cypress/component/*.cy.{ts,tsx}",
  },

  e2e: {
    baseUrl: "http://localhost:4000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
