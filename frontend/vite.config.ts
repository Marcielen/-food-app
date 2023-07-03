import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 3000, open: true },
});
