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
    version: '1.0.0'
  },
  rules: {
    // 禁止使用 console.error
    'no-console-error': noConsoleError,
    // 优先使用 const 声明
    'prefer-const': preferConst,
    // 禁止使用魔法数字
    'no-magic-numbers': noMagicNumbers
  }
};

