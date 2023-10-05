module.exports = {
    /*
     * Разрешены "недоступные" элементы.
     * Данные правила (jsx-a11y) пришли из стайлгайда airbnb, а мы пока не поддерживаем аксессабилити.
     * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
     */

    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/iframe-has-title': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-redundant-roles': 0,
};
