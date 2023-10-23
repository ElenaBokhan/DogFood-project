import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import trashIcon from 'assets/ic-trash.svg';
import {Button, EButtonTheme} from 'Components/Common/Button/Button';
import {Gap} from 'Components/Common/Gap/Gap';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import {Price} from 'Components/Common/Price/Price';
import {EFontColor, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/ProductItem/ProductItem.module.css';
import {useActions} from 'hooks/hooks';
import {Link, useLocation} from 'react-router-dom';
import {useToggleLikeProductMutation} from 'Store/Api/productListApi';
import {UseAppSelector} from 'Store/hooks';
import {selectUser} from 'Store/Slices/userProfile/UserProfileSelectors';
import {isFavourite} from 'Utils/utils';

interface IProductProps {
    product: IProduct;
}

export const ProductItem = ({product}: IProductProps) => {
    const {name, price, discount, wight, description, likes, pictures, _id, stock} = product;

    const state = useLocation();
    const userProfile = UseAppSelector(selectUser);
    const [toggleLikeProduct] = useToggleLikeProductMutation();
    const {addProductToCart, removeFromFavourites} = useActions();

    const isCatalogPage = () => state?.pathname === '/';
    const isLiked = isFavourite(likes, userProfile._id);

    const handleToggleLikeProduct = () => {
        toggleLikeProduct({productId: _id, isLiked: isLiked});
    };

    const handleAddProductToCart = () => {
        !!stock && addProductToCart({product});
    };

    const handleRemoveFromFavourites = () => {
        removeFromFavourites(_id);
    };

    const getIconProductItem = () => {
        const {alt, icon, onClick} = isCatalogPage()
            ? {
                  alt: 'favourites',
                  icon: isLiked ? favouritesFillIcon : favouritesIcon,
                  onClick: handleToggleLikeProduct,
              }
            : {
                  alt: 'trashIcon',
                  icon: trashIcon,
                  onClick: handleRemoveFromFavourites,
              };
        return <IconButton alt={alt} className={styles.favourites} icon={icon} onClick={onClick} />;
    };

    const renderTextContent = () => (
        <div className={styles.textContent}>
            <Price price={price} discount={discount} />
            <Gap size={6} />
            <Text fontColor={EFontColor.GREY} type={ETextType.S1} value={wight} />
            <Text value={name} />
        </div>
    );

    return (
        <div className={styles.productItem}>
            {!!discount && <div className={styles.discount}>{discount + ' %'}</div>}
            {getIconProductItem()}

            <Link state={state} to={`/product/${_id}`}>
                <img alt={description} className={styles.pictures} height={'187px'} src={pictures} width={'236px'} />
            </Link>
            {renderTextContent()}
            <Button onChange={handleAddProductToCart} label={'В корзину'} theme={EButtonTheme.STANDARD} />
        </div>
    );
};
