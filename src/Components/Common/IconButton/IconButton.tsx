import cn from 'classnames';
import styles from 'Components/Common/IconButton/IconButton.module.css';

interface IButtonIconProps {
    type?: string;
    icon: string;
    alt: string;
    onClick?: () => void;
    className?: string;
}

export const IconButton = ({alt, className, icon, onClick}: IButtonIconProps) => {
    const style = className ? cn(styles.button, className) : styles.button;

    return (
        <button className={style} onClick={onClick}>
            <img alt={alt} src={icon} />
        </button>
    );
};
