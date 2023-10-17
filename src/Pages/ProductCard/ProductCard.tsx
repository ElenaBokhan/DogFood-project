import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import searchIcon from 'assets/ic-search.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {Review} from 'Components/Review/Review';
import {BusketSelector} from 'Pages/ProductCard/BusketSelector';
import styles from 'Pages/ProductCard/ProductCard.module.css';
import {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UseAppDispatch, UseAppSelector} from 'Store/hooks';
import {selectProduct} from 'Store/Slices/product/ProductSelectors';
import {getProduct, toggleLikeProductCard} from 'Store/Slices/product/ProductSlice';
import {selectUser} from 'Store/Slices/userProfile/UserProfileSelectors';
import {calculateOldPrice, isFavourite} from 'Utils/utils';

export const ProductCard = () => {
    const {state} = useLocation();
    const {productId} = useParams();
    const dispatch = UseAppDispatch();

    const userProfile = UseAppSelector(selectUser);
    const {data, isLoading} = UseAppSelector(selectProduct);
    const {name, price, discount, description, likes, _id, pictures, reviews} = data || {};

    const isLiked = !isLoading && data && isFavourite(likes, userProfile?._id);

    useEffect(() => {
        dispatch(getProduct(productId));
    }, []);

    const handleToggleLikeProduct = () => {
        dispatch(toggleLikeProductCard({productId: _id, isLiked}));
    };

    const renderAddToFavouriteButton = () => {
        const labelButton = isLiked ? 'Удалить из избранного' : 'В избранное';

        return (
            <button className={styles.toFavourites} onClick={handleToggleLikeProduct}>
                <img alt="favourites" src={isLiked ? favouritesFillIcon : favouritesIcon} />
                <Text fontColor={EFontColor.GREY} type={ETextType.P2} value={labelButton} />
            </button>
        );
    };

    const renderProductMain = () => (
        <div className={styles.productMain}>
            <div>
                {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
                <img alt={description} className={styles.pictures} src={pictures} width={'488px'} />
                <IconButton alt={'searchIcon'} icon={searchIcon} />
            </div>
            <div className={styles.productMainInfo}>
                <div className={styles.priceConteiner}>
                    {!!discount && (
                        <Text
                            className={styles.oldPrice}
                            type={ETextType.S1}
                            value={calculateOldPrice(price, discount)}
                        />
                    )}
                    <Text
                        className={styles.price}
                        fontColor={discount && EFontColor.RED}
                        type={ETextType.H3}
                        value={price}
                        weight={EFontWeight.GENERAL}
                    />
                </div>
                <BusketSelector />
                {renderAddToFavouriteButton()}
            </div>
        </div>
    );

    const renderDescription = () => (
        <>
            <Text type={ETextType.H3} value={'Описание'} />
            <Text value={description} />
        </>
    );

    const renderSpecifications = () => (
        <>
            <Text type={ETextType.H3} value={'Характеристики'} />
            some specific
        </>
    );

    const renderReviews = () => (
        <>
            <Text type={ETextType.H3} value={'Отзывы'} />
            {reviews.map((review) => (
                <Review key={review._id} review={review} />
            ))}
        </>
    );

    return (
        <div className={styles.productCard}>
            {data && (
                <>
                    <TitlePage label={name} pathName={state.pathname} />
                    {renderProductMain()}
                    {renderDescription()}
                    {renderSpecifications()}
                    {renderReviews()}
                    <Button label={'Все отзывы'} theme={EButtonTheme.REDIRECT} />
                </>
            )}
        </div>
    );
};
