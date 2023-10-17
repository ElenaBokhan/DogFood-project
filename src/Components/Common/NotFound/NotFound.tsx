import searchNotFound from 'assets/ic-notfound.svg';
import {LinkButton} from 'Components/Common/LinkButton/LinkButton';
import styles from 'Components/Common/NotFound/NotFound.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {useLocation} from 'react-router-dom';

enum ENotFoundPlacement {
    CATALOG = 'CATALOG',
    FAVOURITES = 'FAVOURITES',
}
export const NotFound = () => {
    const state = useLocation();

    const notFoundConfig = {
        [ENotFoundPlacement.CATALOG]: {
            title: 'Простите, по вашему запросу товаров не найдено.',
            subtitle: '',
        },
        [ENotFoundPlacement.FAVOURITES]: {
            title: 'В Избранном пока ничего нет',
            subtitle: 'Добавляйте товары в Избранное с помощью',
        },
    };

    const renderTitle = () => {
        const placement = state.pathname === '/' ? ENotFoundPlacement.CATALOG : ENotFoundPlacement.FAVOURITES;
        const {title, subtitle} = notFoundConfig[placement];

        return (
            <>
                <Text type={ETextType.P1} value={title} weight={EFontWeight.GENERAL} />
                {!!subtitle && (
                    <Text className={placement === ENotFoundPlacement.FAVOURITES && styles.heart} value={subtitle} />
                )}
            </>
        );
    };

    return (
        <div className={styles.notFound}>
            <img alt="searchNotFound" src={searchNotFound} />
            {renderTitle()}
            <LinkButton label={'На главную'} path={'/'} />
        </div>
    );
};
