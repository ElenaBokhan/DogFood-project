import styles from 'Pages/Cart/Cart.module.css';
import {NotFound} from 'Components/Common/NotFound/NotFound';
import {UseAppSelector} from 'Store/hooks';
import {selectCartProducts} from 'Store/Slices/cart/CartSelectors';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {CartProduct} from './CartProduct';
import {Breadcrumbs} from 'Components/Common/Breadcrumbs/Breadcrumbs';
import {DeliveryPlaceholder} from 'Components/Placeholders/Delivery';
import {CartMenu} from 'Pages/Cart/CartMenu';

export const Cart = () => {
    const cart = UseAppSelector(selectCartProducts);

    const cartSizeText = () => {
        const text = (
            <span>
                <b>{cart.length} товара</b> в корзине
            </span>
        );

        return (
            <div className={styles.cartSizeText}>
                <Text type={ETextType.H1} weight={EFontWeight.SECONDARY}>
                    {text}
                </Text>
            </div>
        );
    };

    const renderProducts = () => {
        return (
            <div className={styles.cartProducts}>
                {cart.map(({product, count}, index) => (
                    <>
                        <CartProduct key={product._id} product={product} count={count} />
                        {index !== cart.length - 1 && <hr />}
                    </>
                ))}
            </div>
        );
    };

    const renderCartMenu = () => {
        return (
            <div className={styles.cartMenuContainer}>
                <CartMenu />
                <DeliveryPlaceholder />
            </div>
        );
    };

    return (
        <>
            <Breadcrumbs />
            {cart.length === 0 ? (
                <NotFound />
            ) : (
                <>
                    {cartSizeText()}
                    <div className={styles.cartConteiner}>
                        {renderProducts()}
                        {renderCartMenu()}
                    </div>
                </>
            )}
        </>
    );
};
