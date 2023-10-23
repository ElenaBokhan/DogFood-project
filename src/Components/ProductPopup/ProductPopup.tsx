import {ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/ProductPopup/ProductPopup.module.css';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import closeIcon from 'assets/ic-close.svg';

interface IProductPopupProps {
    name: string;
    pictures: string;
    onClose: () => void;
}

export const ProductPopup = ({pictures, name, onClose}: IProductPopupProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <Text type={ETextType.H2} value={name} />
                <img alt="productImage" src={pictures} width={'550px'} />
                <IconButton onClick={onClose} className={styles.closeIcon} alt={'closeIcon'} icon={closeIcon} />
            </div>
            <div className={styles.background} />
        </div>
    );
};
