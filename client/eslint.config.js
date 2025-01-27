const { ESLint } = require("eslint");

module.exports = new ESLint({
  baseConfig: {
    parser: "@typescript-eslint/parser",
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
});
