import {EFontColor, EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import styles from 'Components/Common/Price/Price.module.css';
import {calculateUndiscountedPrice} from 'Utils/utils';

interface IPriceProps {
    discount?: number;
    price: number;
    className?: string;
}

export const Price = ({discount, price, className}: IPriceProps) => (
    <div className={className}>
        <Text
            className={styles.price}
            fontColor={!!discount && EFontColor.RED}
            type={ETextType.H3}
            value={price}
            weight={EFontWeight.GENERAL}
        >
            {!!discount && (
                <Text
                    className={styles.oldPrice}
                    weight={EFontWeight.SECONDARY}
                    type={ETextType.S1}
                    value={calculateUndiscountedPrice(price, discount)}
                />
            )}
        </Text>
    </div>
);
