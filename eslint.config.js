import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,          // base JS rules (still useful for TS)
  ...tseslint.configs.recommended, // TypeScript rules + parser
  {
    files: ["src/**/*.ts"],        // 👈 only lint TypeScript files in src/
    ignores: ["node_modules/**", "dist/**", "build/**"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,      // enable type-aware rules (reads tsconfig.json)
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      // ✅ Customize or override rules here
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off", // turn off if you allow `any`
    },
  },
];
