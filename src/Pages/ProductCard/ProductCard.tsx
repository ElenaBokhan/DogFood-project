import api from 'api/api';
import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import searchIcon from 'assets/ic-search.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {TitlePage} from 'Components/Common/TitlePage/TitlePage';
import {UserContext} from 'Components/Layout/Layout';
import {Review} from 'Components/Review/Review';
import {BusketSelector} from 'Pages/ProductCard/BusketSelector';
import styles from 'Pages/ProductCard/ProductCard.module.css';
import {useContext} from 'react';
// eslint-disable-next-line import/named
import {LoaderFunctionArgs, useLoaderData, useLocation} from 'react-router-dom';
import {calculateOldPrice, isFavourite} from 'Utils/utils';

export const ProductCard = () => {
    const {state} = useLocation();
    const {name, discount, description, pictures, price, reviews, likes} = useLoaderData() as IProduct;

    const userProfile = useContext(UserContext) as User;

    const renderAddToFavouriteButton = () => {
        const isLiked = isFavourite(likes, userProfile._id);
        const labelButton = isLiked ? 'Удалить из избранного' : 'В избранное';

        return (
            <button className={styles.toFavourites}>
                <img alt="favourites" src={isLiked ? favouritesFillIcon : favouritesIcon} />
                <Text fontColor={EFontColor.GREY} type={ETextType.P2} value={labelButton} />
            </button>
        );
    };

    const renderProductMain = () => {
        return (
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
    };

    const renderDescription = () => {
        return (
            <>
                <Text type={ETextType.H3} value={'Описание'} />
                <Text value={description} />
            </>
        );
    };

    const renderSpecifications = () => {
        return (
            <>
                <Text type={ETextType.H3} value={'Характеристики'} />
                some specific
            </>
        );
    };

    const renderReviews = () => {
        return (
            <>
                <Text type={ETextType.H3} value={'Отзывы'} />
                {reviews.map((review) => (
                    <Review key={review._id} review={review} />
                ))}
            </>
        );
    };

    return (
        <div className={styles.productCard}>
            <TitlePage label={name} pathName={state.pathname} />
            {renderProductMain()}
            {renderDescription()}
            {renderSpecifications()}
            {renderReviews()}
            <Button label={'Все отзывы'} type={EButtonType.REDIRECT} />
        </div>
    );
};

export const loaderProduct = ({params}: LoaderFunctionArgs) => {
    const {productId} = params;
    return api.getProductById(productId);
};
