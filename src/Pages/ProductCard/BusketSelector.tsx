import {Button} from 'Components/Common/Button/Button';
import {ButtonCounter} from 'Components/Common/ButtonCounter/ButtonCounter';
import styles from 'Pages/ProductCard/ProductCard.module.css';
import {useState} from 'react';

export const BusketSelector = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncrease = () => {
        setCount((prevState) => prevState + 1);
    };

    const handleDecrease = () => {
        setCount((prevState) => prevState - 1);
    };

    return (
        <div className={styles.busketSelector}>
            <ButtonCounter count={count} onDecrease={handleDecrease} onIncrease={handleIncrease} />
            <Button label={'В корзину'} />
        </div>
    );
};
