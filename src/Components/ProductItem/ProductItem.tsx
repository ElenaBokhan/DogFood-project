import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import trashIcon from 'assets/ic-trash.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {Gap} from 'Components/Common/Gap/Gap';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {UserContext} from 'Components/Layout/Layout';
import styles from 'Components/ProductItem/ProductItem.module.css';
import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {calculateOldPrice, isFavourite} from 'Utils/utils';

interface IProductProps {
    product: IProduct;
}

export const ProductItem = ({product}: IProductProps) => {
    const {name, price, discount, wight, description, likes, pictures, _id} = product;

    const state = useLocation();
    const userProfile = useContext(UserContext) as User;

    const isCatalogPage = () => state.pathname === '/';

    const getIconProductItem = () => {
        return isCatalogPage() ? (
            <img
                alt="favouritesIcon"
                className={styles.favourites}
                height={'24px'}
                src={isFavourite(likes, userProfile._id) ? favouritesFillIcon : favouritesIcon}
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
