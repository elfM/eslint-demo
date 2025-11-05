import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
// 导入本地自定义插件
import examplePlugin from "./packages/eslint-plugin-example/index.js";

export default defineConfig([
  // js.configs.recommended,
  // ...tseslint.configs.recommended,
  // ...pluginVue.configs["flat/essential"],
  // {
  //   files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
  //   languageOptions: {
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node
  //     }
  //   }
  // },
  // {
  //   files: ["**/*.vue"],
  //   languageOptions: {
  //     parserOptions: {
  //       parser: tseslint.parser
  //     }
  //   }
  // }

  {
    files: ["src/**/*.js"],
    ignores: ["**/*.config.js"],
    plugins: {
      // 使用本地自定义插件
      example: examplePlugin
    },
    rules: {
      semi: "error",
      // 启用自定义插件规则
      "example/no-console-error": "error",
      "example/prefer-const": "warn",
      "example/no-magic-numbers": ["warn", {
        ignore: [0, 1, -1, 100],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true
      }]
    }
  }
]);
