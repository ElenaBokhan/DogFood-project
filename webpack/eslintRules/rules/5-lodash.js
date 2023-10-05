module.exports = {
    /*
     * Разрешаются только точечные импорты из библиотеки lodash.
     * Потому что только так сокращается размер данной библиотеки.
     * https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/import-scope.md
     */
    'lodash/import-scope': 'off',

    /*
     * Есть функции, для которых это правило не подходит, например shouldComponentUpdate.
     * https://github.com/wix/eslint-plugin-lodash/blob/v7.2.0/docs/rules/import-scope.md
     */
    'lodash/prefer-constant': 'off',

    /*
     * Нам далеко не всегда нужно импортировать lodash.
     * https://github.com/wix/eslint-plugin-lodash/blob/v7.2.0/docs/rules/prefer-lodash-method.md
     */
    'lodash/prefer-lodash-method': 'off',

    'lodash/prefer-get': 0,
    'lodash/prefer-noop': 0,
    'lodash/prefer-startswith': 0,
};
