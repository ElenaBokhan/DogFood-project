import styles from 'Components/Common/IconButton/IconButton.module.css';

interface IButtonIconProps {
    type?: string;
    icon: string;
    alt: string;
    onClick?: () => void;
}

export const IconButton = ({alt, icon, onClick}: IButtonIconProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <img alt={alt} src={icon} />
        </button>
    );
};
