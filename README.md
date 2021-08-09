# @monade/eslint-plugin-vue2
A couple of quality-of-life eslint rules for vue2 + class components.

## Usage

Install:
```bash
$ yarn add https://github.com/monade/eslint-plugin-vue2.git
```

Add to your .eslint.js:

```javascript
   plugins: [
     ...,
     "@monade/vue2"
   ]
   ...
   rules: {
     ...,
      "@monade/vue2/readonly-props": 2,
      "@monade/vue2/missing-component-decorator": 2,
      "@monade/vue2/broken-reactivity": 2,
   }

```

## Rules

### missing-component-decorator
It marks an error when you forget to add the @Component decorator to a Vue component.

### readonly-props
It marks error if a @Prop or @Ref is missing the readonly statement.

### broken-reactivity
It marks an error when you forget to set a default value to data in vue components.


## TODO
* Improve documentation
