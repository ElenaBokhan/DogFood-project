import cn from 'classnames';
import styles from 'Components/Common/Button/Button.module.css';
import React from 'react';

interface IButtonProps {
    className?: string;
    disable?: boolean;
    label: string | number | React.ReactNode;
    onChange?: (page: number) => void;
    type?: EButtonType;
}

export enum EButtonType {
    PAGINATION = 'pagination',
    REDIRECT = 'redirect',
    STANDARD = 'standard',
}

export const Button = ({className, disable, label, onChange, type = EButtonType.STANDARD}: IButtonProps) => {
    const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.dataset.value;

        !disable && !!onChange && onChange(+value);
    };
    return (
        <button className={cn(styles.button, styles[type], styles[className])} data-value={label} onClick={handleClick}>
            {label}
        </button>
    );
};
