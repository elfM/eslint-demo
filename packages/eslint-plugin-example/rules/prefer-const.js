/**
 * 规则：优先使用 const 声明
 * 如果变量声明后未被重新赋值，应该使用 const 而不是 let
 */

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: '优先使用 const 声明，如果变量未被重新赋值',
      category: 'Best Practices',
      recommended: true
    },
    fixable: 'code',
    schema: [],
    messages: {
      preferConst: '变量 "{{name}}" 未被重新赋值，应该使用 const 而不是 let'
    }
  },
  create(context) {
    return {
      VariableDeclaration(node) {
        // 只检查 let 声明
        if (node.kind !== 'let') {
          return;
        }

        // 检查每个声明
        for (const declaration of node.declarations) {
          const variableName = declaration.id.name;

          // 获取变量作用域（ESLint 9.x 使用 sourceCode.getScope）
          const sourceCode = context.sourceCode || context.getSourceCode();
          const scope = sourceCode.getScope(node);
          // 获取变量作用域中的变量名为当前变量名的变量
          const variable = scope.variables.find(v => v.name === variableName);

          if (!variable) {
            continue;
          }

          // 获取变量的声明定义
          const def = variable.defs.find(d => d.node === declaration);
          if (!def) {
            continue;
          }

          // 检查是否有除了声明本身之外的写操作（重新赋值）
          // 需要排除声明引用本身，只检查后续的写操作
          const hasReassignment = variable.references.some(ref => {
            // 排除声明引用本身
            if (ref.identifier === declaration.id) {
              return false;
            }
            // 检查是否是写操作（重新赋值）
            return ref.isWrite();
          });

          // 如果变量存在且未被重新赋值，报告错误
          if (!hasReassignment) {
            context.report({
              node: node,
              messageId: 'preferConst',
              data: {
                name: variableName
              },
              fix(fixer) {
                // 自动修复：将 let 替换为 const
                const sourceCode = context.sourceCode || context.getSourceCode();
                const letToken = sourceCode.getFirstToken(node);
                return fixer.replaceText(letToken, 'const');
              }
            });
          }
        }
      }
    };
  }
};

