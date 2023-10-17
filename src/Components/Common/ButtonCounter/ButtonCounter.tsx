import styles from 'Components/Common/ButtonCounter/ButtonCounter.module.css';

interface IButtonCounterProps {
    count: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

export const ButtonCounter = ({count, onDecrease, onIncrease}: IButtonCounterProps) => (
    <div className={styles.buttonConteiner}>
        <button disabled={count === 0} onClick={onDecrease}>
            -
        </button>
        <span>{count}</span>
        <button onClick={onIncrease}>+</button>
    </div>
);
