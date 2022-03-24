function isVue(node) {
  if (!node.superClass) {
    return false;
  }

  return node.superClass.name === 'Vue' || (node.superClass.callee && node.superClass.callee.name === 'mixins');
}

const getDecoratorName = decorator => decorator?.expression?.callee?.name || decorator?.expression?.name;

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
            if (!isVue(node.parent.parent.parent)) {
              return;
            }
            const decoratorName = getDecoratorName(node);
            if (['Prop', 'Ref'].indexOf(decoratorName) === -1) {
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
            if (isVue(node) && !node.decorators) {
              context.report({
                node: node,
                message: 'Missing @Component'
              });
            }
          }
        }
      }
    },
    "broken-reactivity": {
      create: function (context) {
        return {
          ClassProperty(node) {
            if (!isVue(node.parent.parent)) {
              return;
            }
            if (node.value) {
              return;
            }
            if (node.decorators?.length) {
              return;
            }
            context.report({
              node: node,
              message: 'Broken reactivity: Please assign a default value to props'
            });
          }
        }
      }
    },
  }
}
