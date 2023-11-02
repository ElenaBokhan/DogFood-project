import styles from 'Components/Placeholders/Placeholder.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import qualityIcon from 'assets/ic-quality.svg';

export const QualityPlaceholder = () => {
    return (
        <div className={styles.placeholder}>
            <img src={qualityIcon} alt="truckIcon" />
            <div className={styles.deliveryPrice}>
                <Text weight={EFontWeight.GENERAL} value={'Гарантия качества'} />
                <Text type={ETextType.P2}>
                    {
                        'Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.'
                    }
                </Text>
            </div>
        </div>
    );
};
