module.exports = {
    /*
     * JSX доступен только в данных файлах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
     */
    'react/jsx-filename-extension': [2, {extensions: ['.jsx', '.tsx']}],

    /*
     * Свойство 'key' обязательно если оно требуется.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
     */
    'react/jsx-key': 2,

    /*
     * Максимальная вложенность элементов = 10.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
     */
    'react/jsx-max-depth': [2, {max: 10}],

    /*
     * Между 'JSX-элементами' необязательна пустая строка. (потому что есть JSX комменты для JSX элементов).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
     */
    'react/jsx-newline': 0,

    /*
     * Запрещены биндинги и стрелочные функции в пропсах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */
    'react/jsx-no-bind': 2,

    /*
     * Запрещается в контекст провайдера помещать нестабильные пропсы.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
     */
    'react/jsx-no-constructed-context-values': 2,

    /*
     * Запрещены опасные js-ссылки (<a href="javascript:void(0)"></a>).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
     */
    'react/jsx-no-script-url': 2,

    /*
     * Безопасное открытие ссылок не регламентируется.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
     */
    'react/jsx-no-target-blank': 0,

    /*
     * Запрещены избыточные фрагменты.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
     */
    'react/jsx-no-useless-fragment': 2,

    /*
     * Спред-пропсы разрешены.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
     */
    'react/jsx-props-no-spreading': 0,

    /*
     * Необходимо поддерживать алфавитный порядок в пропсах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
     */
    'react/jsx-sort-props': [2, {ignoreCase: true, shorthandLast: true}],

    'react/jsx-boolean-value': 0,

    /*
     *suppress errors for missing 'import React' in files
     */
    'react/react-in-jsx-scope': 'off',
};
