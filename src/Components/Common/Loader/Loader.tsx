import styles from 'Components/Common/Loader/Loader.module.css';

export const Loader = () => (
    <div className={styles.background}>
        <span className={styles.loader}></span>
    </div>
);
