import arrowDown from 'assets/ic-down-arrow.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {NotFound} from 'Components/Common/NotFound/NotFound';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {ProductList} from 'Components/ProductList/ProductList';
import {PER_PAGE} from 'Const';
import style from 'Pages/Favourites/Favourites.module.css';
import {UseAppSelector} from 'Store/hooks';
import {selectFavourites} from 'Store/Slices/favourites/FavouritesSelector';

export const Favourites = () => {
    const favourites = UseAppSelector(selectFavourites);

    const showMoreButton = () => {
        const labelButton = (
            <>
                <span>{'Показать еще'}</span>
                <img src={arrowDown} alt="arrowDown" />
            </>
        );

        return <Button label={labelButton} theme={EButtonTheme.REDIRECT} />;
    };

    return (
        <div className={style.favourites}>
            <TitlePage label={'Избранное'} />
            {favourites.length > 0 ? (
                <div className={style.favouritesList}>
                    <ProductList products={favourites} />
                    {favourites.length > PER_PAGE && showMoreButton()}
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};
