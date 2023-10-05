module.exports = {
    /*
     * Разрешается использовать сущности до их объявления.
     * Сейчас существует баг с версией React https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
     * Поэтому вместо этого правила, сейчас включено @typescript-eslint/no-use-before-define.
     * https://eslint.org/docs/rules/no-use-before-define
     */
    'no-use-before-define': 0,

    /*
     * Разрешается использовать имена переменных, как и в родительской области видимости.
     * https://eslint.org/docs/rules/no-shadow
     */
    'no-shadow': 0,

    /*
     * Семантика стрелочных функций не регламентируется.
     * Возвращать значение сразу или явно указывать return - это непринципиальный кейс.
     * https://eslint.org/docs/rules/arrow-body-style
     */
    'arrow-body-style': 0,

    /*
     * Максимальное кол-во строк в файле = 1000.
     * Файлы должны быть максимально компактными и легко читаемыми.
     * https://eslint.org/docs/rules/max-lines
     */
    'max-lines': [2, 5000],

    /*
     * Запрещается использование класса console.
     * Единственное исключение = console.error().
     * https://eslint.org/docs/rules/no-console
     */
    'no-console': 0,

    /*
     * Разрешается оставлять неиспользованные переменные.
     * Правило включается посредством '@typescript-eslint/no-unused-vars'.
     * Потому что только TS умеет работать с переменными в типизации.
     * https://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': 0,

    /*
     * Все файлы должны заканчиваться пустой строкой.
     * https://eslint.org/docs/rules/eol-last
     */
    'eol-last': [2, 'always'],

    /*
     * Запрещается использовать стрелки там, где они могут быть спутаны со знаком сравнения.
     * https://eslint.org/docs/rules/no-confusing-arrow
     */
    'no-confusing-arrow': 0,

    /*
     * Аргументы стрелочной функции всегда должны быть в скобках.
     * Оставление 'висячих' аргументов выглядит неаккуратно в большой массе кода.
     * https://eslint.org/docs/rules/arrow-parens
     */
    'arrow-parens': [2, 'always'],

    /*
     * Запрещено изменять аргументы функции.
     * Это может привести к неявному изменению значения.
     * https://eslint.org/docs/rules/no-param-reassign
     */
    'no-param-reassign': 0,

    /*
     * Разрешается использовать и шаблоны и конкатенацию.
     * Конкатенация зачастую выглядит аккуратней.
     * https://eslint.org/docs/rules/prefer-template
     */
    'prefer-template': 0,

    /*
     * Запрещается javascript:void(0) и подобное.
     * https://eslint.org/docs/rules/no-script-url
     */
    'no-script-url': 2,

    /*
     * Разрешается любой тип ошибки в 'catch' промиса.
     * https://eslint.org/docs/rules/prefer-promise-reject-errors
     */
    'prefer-promise-reject-errors': 0,

    /*
     * Управление стилем комментариев.
     * https://eslint.org/docs/rules/multiline-comment-style
     */
    'multiline-comment-style': 0,

    /*
     * Разрешается не использовать 'default' конструкцию в 'switch'.
     * https://eslint.org/docs/rules/default-case
     */
    'default-case': 0,

    /*
     * Деструктуризация в массивах и объектах необязательна.
     * Мы часто обращаемся к элементу массива по его индексу, а данное правило этому противоречит.
     * https://eslint.org/docs/rules/prefer-destructuring
     */
    'prefer-destructuring': 0,

    /*
     * Запрещается отделять спред-оператор с переменной пробелом.
     * https://eslint.org/docs/rules/rest-spread-spacing
     */
    'rest-spread-spacing': [2, 'never'],

    /*
     * Разрешаются неиспользуемые выражения.
     * Необходимо для выражений типа 'a && c || b()'.
     * https://eslint.org/docs/rules/no-unused-expressions
     */
    'no-unused-expressions': 0,

    /*
     * Пакетной сортировкой импортов будет заниматься import-helpers/order-imports.
     * https://eslint.org/docs/rules/sort-imports
     */
    'sort-imports': [
        'error',
        {
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            allowSeparatedGroups: true,
        },
    ],

    'no-bitwise': 0,
    'no-empty-function': 'off',
    'no-lonely-if': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',

    eqeqeq: 2,

    'import-helpers/order-imports': [
        'error',
        {
            newlinesBetween: 'ignore',
            groups: ['/^@.*$/', '/^[a-z].*$/', 'module', ['parent', 'sibling', 'index']],
            alphabetize: {order: 'asc', ignoreCase: false},
        },
    ],
};
