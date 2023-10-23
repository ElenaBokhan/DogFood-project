import styles from 'Components/Common/ButtonCounter/ButtonCounter.module.css';

interface IButtonCounterProps {
    count: number;
    onDecrease: () => void;
    onIncrease: () => void;
    max: number;
}

export const ButtonCounter = ({count = 0, onDecrease, onIncrease, max}: IButtonCounterProps) => (
    <div className={styles.buttonConteiner}>
        <button disabled={count === 0} onClick={onDecrease}>
            –
        </button>
        <span>{count}</span>
        <button disabled={count === max} onClick={onIncrease}>
            +
        </button>
    </div>
);
