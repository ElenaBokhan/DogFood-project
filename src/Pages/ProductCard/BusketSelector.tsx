import {Button} from 'Components/Common/Button/Button';
import {ButtonCounter} from 'Components/Common/ButtonCounter/ButtonCounter';
import {useActions} from 'hooks/hooks';
import styles from 'Pages/ProductCard/ProductCard.module.css';
import {useEffect, useState} from 'react';
import {UseAppSelector} from 'Store/hooks';
import {selectCartProductCount} from 'Store/Slices/cart/CartSelectors';

interface IBusketSelectorProps {
    stock: number;
    product: IProduct;
}

export const BusketSelector = ({stock, product}: IBusketSelectorProps) => {
    const productCartCount = UseAppSelector(selectCartProductCount(product._id));
    const [count, setCount] = useState<number>(productCartCount || 0);

    const {addProductToCart} = useActions();

    useEffect(() => {
        setCount(productCartCount);
    }, [productCartCount]);

    const handleIncrease = () => {
        setCount((prevState) => prevState + 1);
    };

    const handleDecrease = () => {
        setCount((prevState) => prevState - 1);
    };

    const handleClick = () => {
        !!stock && addProductToCart({product, count});
    };

    return (
        <div className={styles.busketSelector}>
            <ButtonCounter max={stock} count={count} onDecrease={handleDecrease} onIncrease={handleIncrease} />
            <Button onChange={handleClick} label={'В корзину'} />
        </div>
    );
};
