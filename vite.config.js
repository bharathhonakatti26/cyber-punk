import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/cyber-punk/", // Replace <repository-name> with your GitHub repo name
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "public/**/*", // Copy everything from the public folder
          dest: ".", // Copy to the root of the build output
        },
      ],
    }),
  ],
});