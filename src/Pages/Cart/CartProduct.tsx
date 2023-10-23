import styles from 'Pages/Cart/Cart.module.css';
import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Link} from 'react-router-dom';
import {ButtonCounter} from 'Components/Common/ButtonCounter/ButtonCounter';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import trashIcon from 'assets/ic-trash.svg';
import {Price} from 'Components/Common/Price/Price';
import {ICartProduct} from 'Store/Slices/cart/CartSlice';
import {useActions} from 'hooks/hooks';

export const CartProduct = ({product, count}: ICartProduct) => {
    const {name, price, discount, stock, _id, description, pictures, wight} = product;

    const {incrementCount, decrementCount, removeProductFromCart} = useActions();

    const handleIncrease = () => {
        incrementCount(_id);
    };

    const handleDecrease = () => {
        decrementCount(_id);
    };

    const handleRemoveProductFromCart = () => {
        removeProductFromCart(_id);
    };

    return (
        <div className={styles.cartProduct}>
            <Link className={styles.cartProductLink} to={`/product/${_id}`}>
                <img alt={description} height={'62px'} src={pictures} width={'62px'} />
                <div className={styles.productName}>
                    <Text type={ETextType.P2} weight={EFontWeight.GENERAL} value={name} />
                    <Text type={ETextType.S1} fontColor={EFontColor.GREY} value={wight} />
                </div>
            </Link>
            <ButtonCounter onDecrease={handleDecrease} onIncrease={handleIncrease} count={count} max={stock} />
            <IconButton alt="trashIcon" icon={trashIcon} onClick={handleRemoveProductFromCart} />
            <Price className={styles.cartPrice} discount={discount} price={price * count} />
        </div>
    );
};
