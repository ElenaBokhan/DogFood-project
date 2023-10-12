import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import trashIcon from 'assets/ic-trash.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {Gap} from 'Components/Common/Gap/Gap';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/ProductItem/ProductItem.module.css';
import {Link, useLocation} from 'react-router-dom';
import {toggleLikeProduct} from 'Slices/productList/ProductListSlice';
import {selectUser} from 'Slices/userProfile/UserProfileSelectors';
import {UseAppDispatch, UseAppSelector} from 'Store/hooks';
import {calculateOldPrice, isFavourite} from 'Utils/utils';

interface IProductProps {
    product: IProduct;
}

export const ProductItem = ({product}: IProductProps) => {
    const {name, price, discount, wight, description, likes, pictures, _id} = product;

    const state = useLocation();
    const dispatch = UseAppDispatch();
    const userProfile = UseAppSelector(selectUser);
    const isCatalogPage = () => state.pathname === '/';
    const isLiked = isFavourite(likes, userProfile._id);

    const handleToggleLikeProduct = () => {
        dispatch(toggleLikeProduct({productId: _id, isLiked: isLiked}));
    };

    const getIconProductItem = () => {
        return isCatalogPage() ? (
            <IconButton
                alt="favourites"
                className={styles.favourites}
                icon={isLiked ? favouritesFillIcon : favouritesIcon}
                onClick={handleToggleLikeProduct}
            />
        ) : (
            <img alt="trashIcon" className={styles.favourites} height={'24px'} src={trashIcon} />
        );
    };

    const renderTextContent = () => {
        return (
            <div className={styles.textContent}>
                {!!discount && (
                    <Text className={styles.oldPrice} type={ETextType.S1} value={calculateOldPrice(price, discount)} />
                )}
                <Text
                    className={styles.price}
                    fontColor={!!discount && EFontColor.RED}
                    type={ETextType.H3}
                    value={price}
                    weight={EFontWeight.GENERAL}
                />
                <Gap size={6} />
                <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={wight} />
                <Text value={name} />
            </div>
        );
    };

    return (
        <div className={styles.productItem}>
            {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
            {getIconProductItem()}

            <Link state={state} to={`/product/${_id}`}>
                <img alt={description} className={styles.pictures} height={'187px'} src={pictures} width={'236px'} />
            </Link>
            {renderTextContent()}
            <Button label={'В корзину'} type={EButtonType.STANDARD} />
        </div>
    );
};
