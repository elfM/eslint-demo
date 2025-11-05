/**
 * 规则：禁止使用 console.error
 * 可以使用 console.warn 或自定义日志函数替代
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: '禁止使用 console.error，建议使用自定义日志函数',
      category: 'Best Practices',
      recommended: false
    },
    fixable: null,
    schema: [],
    messages: {
      noConsoleError: '禁止使用 console.error，建议使用自定义日志函数或 console.warn'
    }
  },
  create(context) {
    return {
      MemberExpression(node) {
        // 检查是否是 console.error 调用
        if (
          node.object &&
          node.object.name === 'console' &&
          node.property &&
          node.property.name === 'error'
        ) {
          context.report({
            node,
            messageId: 'noConsoleError'
          });
        }
      }
    };
  }
};

