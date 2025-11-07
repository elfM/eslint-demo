/**
 * 本地自定义 ESLint 插件示例
 * 导出所有自定义规则
 */

import noConsoleError from './rules/no-console-error.js';
import preferConst from './rules/prefer-const.js';
import noMagicNumbers from './rules/no-magic-numbers.js';

export default {
  meta: {
    name: 'eslint-plugin-example',
    version: '1.0.0',
    nameSpace: 'example',
  },
  rules: {
    // 禁止使用 console.error
    'no-console-error': noConsoleError,
    // 优先使用 const 声明
    'prefer-const': preferConst,
    // 禁止使用魔法数字
    'no-magic-numbers': noMagicNumbers
  },
  configs: {
    recommended: {
      // 在 flat config 中，推荐配置只需要包含 rules
      // plugins 应该在 ESLint 配置中单独注册
      files: ["**/*.js"],
      rules: {
        // 规则名称需要包含插件前缀（插件必须在配置中注册）
        'example/no-console-error': 'error',
        'example/prefer-const': 'warn',
        'example/no-magic-numbers': ['warn', { ignore: [0, 1, -1] }]
      }
    }
  }
};

