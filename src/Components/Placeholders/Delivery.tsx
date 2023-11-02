import styles from 'Components/Placeholders/Placeholder.module.css';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import truckIcon from 'assets/ic-truck.svg';

export const DeliveryPlaceholder = () => {
    const valuePlaceOfService = (
        <span>
            Доставка в пункт выдачи — <b>от 199 Р</b>
        </span>
    );

    const valueCourier = (
        <span>
            Доставка курьером — <b>от 399 Р</b>
        </span>
    );

    return (
        <div className={styles.placeholder}>
            <img src={truckIcon} alt="truckIcon" />
            <div className={styles.deliveryPrice}>
                <Text weight={EFontWeight.GENERAL} value={'Доставка по всему Миру!'} />
                <Text type={ETextType.P2}>{valuePlaceOfService}</Text>
                <Text type={ETextType.P2}>{valueCourier}</Text>
            </div>
        </div>
    );
};
