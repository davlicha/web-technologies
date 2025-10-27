import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.recommended,
    ...pluginTs.configs.recommended,

    eslintConfigPrettier,

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: pluginTs.parser,
            parserOptions: {
                project: true,
            },
        },

        files: ['src/**/*.ts', 'test/**/*.ts'],

        rules: {
            'prettier/prettier': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
