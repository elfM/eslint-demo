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
          
          // 获取变量作用域
          const scope = context.getScope();
          const variable = scope.variables.find(v => v.name === variableName);
          
          // 如果变量存在且未被重新赋值，报告错误
          if (variable && !variable.references.some(ref => ref.isWrite())) {
            context.report({
              node: node,
              messageId: 'preferConst',
              data: {
                name: variableName
              },
              fix(fixer) {
                // 自动修复：将 let 替换为 const
                const sourceCode = context.getSourceCode();
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

