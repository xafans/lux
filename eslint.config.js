import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts"],
        ignores: ["node_modules/**", "dist/**", "build/**"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
        },
    },
];
