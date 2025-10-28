import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["node_modules/**", "dist/**", "build/**"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {},
    },
];
