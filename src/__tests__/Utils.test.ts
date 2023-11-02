import * as commonUtils from 'Utils/utils';

describe('Тесты для утилит', () => {
    describe(`Тесты для утилиты ${commonUtils.isFavourite}`, () => {
        const likes = ['123'];

        test('Определяет содержит ли набор лайков товара пользовательский лайк', () => {
            const isFavouriteSpy = jest.spyOn(commonUtils, 'isFavourite');
            expect(commonUtils.isFavourite(likes, '123')).toBeTruthy();
            expect(isFavouriteSpy).toHaveBeenCalledTimes(1);
        });

        test('Определяет что набор лайков товара не содержит пользовательский лайк', () => {
            const isFavouriteSpy = jest.spyOn(commonUtils, 'isFavourite');
            expect(commonUtils.isFavourite(likes, '456')).toBeFalsy();
            expect(isFavouriteSpy).toHaveBeenCalledTimes(1);
        });
    });
});
