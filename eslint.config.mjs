import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-undef": "off",
    },
  },
];
