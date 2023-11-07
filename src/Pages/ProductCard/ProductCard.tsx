import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import searchIcon from 'assets/ic-search.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {LinkButton} from 'Components/Common/LinkButton/LinkButton';
import {Price} from 'Components/Common/Price/Price';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {DeliveryPlaceholder} from 'Components/Placeholders/Delivery';
import {QualityPlaceholder} from 'Components/Placeholders/Quality';
import {ProductPopup} from 'Components/ProductPopup/ProductPopup';
import {Review} from 'Components/Review/Review';
import {useActions} from 'hooks/hooks';
import {BusketSelector} from 'Pages/ProductCard/BusketSelector';
import styles from 'Pages/ProductCard/ProductCard.module.css';
import {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useProductQuery} from 'Store/Api/productListApi';
import {UseAppSelector} from 'Store/hooks';
import {selectIsFavourite} from 'Store/Slices/favourites/FavouritesSelector';

export const ProductCard = () => {
    const {state} = useLocation();
    const {productId} = useParams();

    const {data} = useProductQuery(productId);
    const {name, price, discount, description, pictures, reviews, stock, _id} = data || {};
    const isFavourite = UseAppSelector(selectIsFavourite(_id));
    const {addToFavourites, removeFromFavourites} = useActions();
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    const handleTogglePopup = () => {
        setOpenPopup(!openPopup);
    };

    const handleToggleProductToFavourites = () => {
        isFavourite ? removeFromFavourites(_id) : addToFavourites(data);
    };

    const renderAddToFavouriteButton = () => {
        const labelButton = isFavourite ? 'Удалить из избранного' : 'В избранное';

        return (
            <button className={styles.toFavourites} onClick={handleToggleProductToFavourites}>
                <img alt="favourites" src={isFavourite ? favouritesFillIcon : favouritesIcon} />
                <Text fontColor={EFontColor.GREY} type={ETextType.P2} value={labelButton} />
            </button>
        );
    };

    const renderProductMain = () => (
        <div className={styles.productMain}>
            <div className={styles.productImage}>
                {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
                <img alt={description} className={styles.pictures} src={pictures} width={'488px'} />
                <IconButton
                    onClick={handleTogglePopup}
                    className={styles.searchIcon}
                    alt={'searchIcon'}
                    icon={searchIcon}
                />
            </div>
            <div className={styles.productMainInfo}>
                <Price price={price} discount={discount} />
                <BusketSelector stock={stock} product={data} />
                {renderAddToFavouriteButton()}
                <DeliveryPlaceholder />
                <QualityPlaceholder />
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
            <LinkButton path="/addReview" label={'Написать отзыв'} state={data} />
            {reviews.map((review) => (
                <Review key={review._id} review={review} />
            ))}
        </>
    );

    return (
        <div className={styles.productCard}>
            {data && (
                <>
                    <TitlePage label={name} pathName={state?.pathname} />
                    {renderProductMain()}
                    {renderDescription()}
                    {renderSpecifications()}
                    {renderReviews()}
                    {openPopup && <ProductPopup onClose={handleTogglePopup} pictures={pictures} name={name} />}

                    <Button label={'Все отзывы'} theme={EButtonTheme.REDIRECT} />
                </>
            )}
        </div>
    );
};
