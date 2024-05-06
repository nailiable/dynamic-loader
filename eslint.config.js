const antfu = require('@antfu/eslint-config')

module.exports = antfu.default({
  rules: {
    'ts/method-signature-style': 'off',
    'jsdoc/no-defaults': 'off'
  },
})
