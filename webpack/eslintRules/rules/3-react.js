module.exports = {
    /*
     * Деструктуризация в 'props', 'state', 'context' необязательна.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
     */
    'react/destructuring-assignment': 0,

    /*
     * Поле 'displayName' у компонента необязателен.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
     */
    'react/display-name': 0,

    /*
     * Запрещается обращаться к 'this.state' внутри 'setState'.
     * Это может привести к ошибкам, связанным с потерей актуального состояния стейта, когда в очереди несколько
     * вызовов 'setState'. Для получения текущего стейта используйте колбэк.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
     */
    'react/no-access-state-in-setstate': 2,

    /*
     * Между компонентами, написанными в строку должны быть пробелы.
     * Компоненты не выглядят слипнувшимися и это добавляет аккуратности.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
     */
    'react/no-adjacent-inline-elements': 2,

    /*
     * Запрещается использовать индексы массивов для 'key' в React-компонентах.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
     */
    'react/no-array-index-key': 1,

    /*
     * Запрещается использование 'опасных' пропсов.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
     */
    'react/no-danger': 2,

    /*
     * Запрещается мутировать стейт напрямую (кроме конструктора класса).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
     */
    'react/no-direct-mutation-state': 2,

    /*
     * Предпочитать 'SFC', нежели классы.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
     */
    'react/prefer-stateless-function': 1,

    /*
     * Стейт создается только в теле класса (не в конструкторе).
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
     */
    'react/state-in-constructor': 0,

    /*
     * Статичные поля описываются только в теле ES6 класса.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
     */
    'react/static-property-placement': 0,

    /*
     * Мы не используем prop-types, у нас typescript
     */
    'react/require-default-props': 0,

    /*
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
     */
    'react/no-did-update-set-state': 0,

    'react/sort-comp': 0,
};
