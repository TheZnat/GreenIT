import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        file: resolve(__dirname, "index.html"),
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    ViteImageOptimizer({
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
              },
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              convertPathData: false,
            },
          },
          "sortAttrs",
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
            },
          },
        ],
      },
    }),
  ],
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
});
