
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import eslint from "@eslint/js"
import pluginJs from "@eslint/js"
import react from "eslint-plugin-react"
import hooks from "eslint-plugin-react-hooks"
import next from "@next/eslint-plugin-next"

export default defineConfig([
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
    eslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    {
        plugins: {
            "react-hooks": hooks,
            "@next/next": next,
        },
        rules: {
            ...hooks.configs.recommended.rules,
            ...next.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-extra-boolean-cast": "warn",
            "react/prop-types": "off",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        "components/theme/**/*",
        "theme/**/*",
    ]),
])

/*

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
})

const eslintConfig = [
    ...compat.config({
        extends: ['next'],
        rules: {
            'react-hooks/exhaustive-deps': 'warn',
        },
    }),
]

export default eslintConfig
*/

/*
import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    extends: [...next],
}]);
*/