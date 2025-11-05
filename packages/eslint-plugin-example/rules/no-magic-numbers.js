/**
 * 规则：禁止使用魔法数字
 * 魔法数字应该定义为有意义的常量
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: '禁止使用魔法数字，应该定义为有意义的常量',
      category: 'Best Practices',
      recommended: false
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: {
              type: 'number'
            },
            description: '忽略的数字列表（如 0, 1, -1）'
          },
          ignoreArrayIndexes: {
            type: 'boolean',
            default: false,
            description: '是否忽略数组索引'
          },
          ignoreDefaultValues: {
            type: 'boolean',
            default: false,
            description: '是否忽略默认参数值'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      noMagicNumbers: '禁止使用魔法数字 "{{number}}"，应该定义为有意义的常量'
    }
  },
  create(context) {
    const options = context.options[0] || {};
    const ignoreNumbers = options.ignore || [0, 1, -1];
    const ignoreArrayIndexes = options.ignoreArrayIndexes || false;
    const ignoreDefaultValues = options.ignoreDefaultValues || false;

    /**
     * 检查节点是否应该被忽略
     */
    function shouldIgnore(node) {
      const parent = node.parent;

      // 忽略数组索引
      if (ignoreArrayIndexes && parent.type === 'MemberExpression') {
        return parent.property === node;
      }

      // 忽略默认参数值
      if (ignoreDefaultValues && parent.type === 'AssignmentPattern') {
        return parent.right === node;
      }

      return false;
    }

    return {
      Literal(node) {
        // 只检查数字字面量
        if (typeof node.value !== 'number') {
          return;
        }

        // 检查是否在忽略列表中
        if (ignoreNumbers.includes(node.value)) {
          return;
        }

        // 检查是否应该被忽略
        if (shouldIgnore(node)) {
          return;
        }

        // 报告错误
        context.report({
          node,
          messageId: 'noMagicNumbers',
          data: {
            number: node.value
          }
        });
      }
    };
  }
};

