module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'vue/this-in-template': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-setup-props-destructure': 'off',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}
