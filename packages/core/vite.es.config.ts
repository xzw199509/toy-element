import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path"
import dts from 'vite-plugin-dts';
import { includes } from 'lodash-es';
const COMP_NAMES = [
  "Alert",
  "Button",
  "Collapse",
  "Dropdown",
  "Form",
  "Icon",
  "Input",
  "Loading",
  "Message",
  "MessageBox",
  "Notification",
  "overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload"
]

// es 体积更小 分包
export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: "../../tsconfig.build.json",
    outDir: "dist/types"
  })],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assertInfo) => {
          if (assertInfo.name === "style.css") return "index.css"
          return assertInfo.name as string
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";

          for (const item of COMP_NAMES) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        },
      }
    }
  }
})