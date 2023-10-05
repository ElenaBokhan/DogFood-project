import favouritesFillIcon from 'assets/ic-favorites-fill.svg';
import favouritesIcon from 'assets/ic-favorites.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {Gap} from 'Components/Common/Gap/Gap';
import {EFontColor, EFontType, ETextSize, Text} from 'Components/Common/Text/Text';
import styles from 'Components/ProductItem/ProductItem.module.css';
import {calculateOldPrice} from 'Utils/NumbersUtils';

export interface IProductProps {
    product: IProduct;
}

export interface IProduct {
    name: string;
    price: number;
    discount: number;
    wight: string;
    description: string;
    isFavorite: boolean;
    isCart?: boolean;
    available?: boolean;
    stock?: number;
    picture: string;
}

export const ProductItem = ({product}: IProductProps) => {
    const {name, price, discount, wight, description, isFavorite, picture} = product;
    const isDiscount = !!discount;

    const renderTextContent = () => {
        return (
            <div className={styles.textContent}>
                {isDiscount && (
                    <Text className={styles.oldPrice} size={ETextSize.S12} value={calculateOldPrice(price, discount)} />
                )}
                <Text
                    className={styles.price}
                    fontColor={isDiscount && EFontColor.RED}
                    size={ETextSize.S20}
                    type={EFontType.GENERAL}
                    value={price}
                />
                <Gap size={6} />
                <Text fontColor={EFontColor.GREY} size={ETextSize.S12} value={wight} />
                <Text size={ETextSize.S16} value={name} />
            </div>
        );
    };
    return (
        <div className={styles.productItem}>
            {isDiscount && <div className={styles.discount}>{discount + ' %'}</div>}
            <img
                alt="favouritesIcon"
                className={styles.favourites}
                height={'24px'}
                src={isFavorite ? favouritesFillIcon : favouritesIcon}
            />
            <img alt={description} className={styles.pictures} height={'187px'} src={picture} width={'236px'} />
            {renderTextContent()}
            <Button label={'В корзину'} type={EButtonType.STANDARD} />
        </div>
    );
};
