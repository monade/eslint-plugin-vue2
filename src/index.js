module.exports = {
  rules: {
    "readonly-props": {
      create: function (context) {
        return {
          Decorator(node) {
            if (node.expression.type !== 'CallExpression') {
              return;
            }
            if (node.parent.type !== 'ClassProperty') {
              return;
            }
            if (!node.parent.readonly) {
              context.report({
                node: node,
                message: 'Missing readonly statement'
              });
            }
          },
        }
      },
    },
    "missing-component-decorator": {
      create: function (context) {
        return {
          ClassDeclaration(node) {
            if (!node.superClass) {
              return;
            }

            const isVue = node.superClass.name === 'Vue' || (node.superClass.callee && node.superClass.callee.name === 'mixins');

            if (isVue && !node.decorators) {
              context.report({
                node: node,
                message: 'Missing @Component'
              });
            }
          }
        }
      }
    },
  }
}
