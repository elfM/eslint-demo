import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
// 导入本地自定义插件
import examplePlugin from "./packages/eslint-plugin-example/index.js";

export default defineConfig([
  // 启用 JavaScript 推荐的预定义配置（包含基础规则）
  // js.configs.recommended,
  // {
  //   rules: {
  //     "no-unused-vars": "warn",
  //   },
  // },


  // ------------------------------ 全局忽略配置 ------------------------------
  // 方式 1: 使用单独的 ignores 配置对象（推荐）
  // {
  //   ignores: ["src/**/*.config.js"]
  // },

  // ------------------------------ 本地自定义插件 ------------------------------
  examplePlugin.configs.recommended,
  {
    // 方式 2: 在 files 中使用否定模式排除 .config.js 文件
    // files: ["src/**/*.js", "!src/**/*.config.js"],
    files: ["src/**/*.js"],
    plugins: {
      // 使用本地自定义插件
      example: examplePlugin
    },

    rules: {
      // 基础规则 - 确保错误明显
      "semi": "error",
      "no-unused-vars": "warn",
      "no-debugger": "error",
      "no-eval": "error",
      "no-alert": "warn",

      // 启用自定义插件规则
      // "example/no-console-error": "warn",
      // "example/prefer-const": "warn",
      // "example/no-magic-numbers": ["warn", {
      //   ignore: [0, 1, -1, 100],
      //   ignoreArrayIndexes: true,
      //   ignoreDefaultValues: true
      // }]
    }
  }

  // {
  //   rules: {
  //     semi: ["error", "always"],
  //   }
  // },
  // {
  //   rules: {
  //     semi: ["warn"],
  //   }
  // },
]);
