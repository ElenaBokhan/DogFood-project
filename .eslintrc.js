const eslintRules = require('./webpack/eslintRules/rules/1-eslint');
const importRules = require('./webpack/eslintRules/rules/2-import');
const reactRules = require('./webpack/eslintRules/rules/3-react');
const reactJSXRules = require('./webpack/eslintRules/rules/4-react-jsx');
const typescriptRules = require('./webpack/eslintRules/rules/6-typescript');
const a11yRules = require('./webpack/eslintRules/rules/7-jsx-a11y');

module.exports = {
    env: {
        es6: true,
    },
    parser: '@typescript-eslint/parser',

    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react', 'eslint-plugin-import-helpers'],

    settings: {
        'import/resolver': {
            node: {extensions: ['.js', '.jsx', '.ts', '.tsx']},
        },
    },

    rules: {
        // Правила ESLint.
        ...eslintRules,

        // // // Правила импортов.
        ...importRules,

        // // Правила React.
        ...reactRules,

        // // Правила React JSX.
        ...reactJSXRules,

        // Правила TypeScript.
        ...typescriptRules,

        // Правила JSX a11y.
        ...a11yRules,

        'import-helpers/order-imports': [
            'warn',
            {
                // example configuration
                newlinesBetween: 'always',
                groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
                alphabetize: {order: 'asc', ignoreCase: true},
            },
        ],
        // Правила Prettier.
        'no-empty-function': 'warn',
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-bind': ['error', {ignoreDOMComponents: true, allowArrowFunctions: true}],
    },
};
