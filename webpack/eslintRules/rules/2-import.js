module.exports = {
    /*
     * Разрешается не указывать расширения файлов для указанных типов.
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
     */
    'import/extensions': [2, 'ignorePackages', {js: 'never', jsx: 'never', ts: 'never', tsx: 'never'}],
    // 'import/extensions': 0,
    /*
     * Разрешается использовать именованные экспорты (кроме асинхронных компонентов).
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
     */
    'import/prefer-default-export': 0,

    /*
     * Запрещены 'overhead' импорты, например, при обращении к 'index'.
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
     */
    'import/no-useless-path-segments': [2, {noUselessIndex: true}],

    /*
     * Проверка резолва происходит за счет сборщика, а не линта.
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
     */
    'import/no-unresolved': 0,

    'import/no-extraneous-dependencies': 0,
    'import/order': 0,
};
