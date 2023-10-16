import cn from 'classnames';
import styles from 'Components/Common/Button/Button.module.css';
import React from 'react';

interface IButtonProps {
    className?: string;
    disable?: boolean;
    label: string | number | React.ReactNode;
    onChange?: (page: number) => void;
    theme?: EButtonTheme;
    type?: 'button' | 'submit' | 'reset';
}

export enum EButtonTheme {
    PAGINATION = 'pagination',
    REDIRECT = 'redirect',
    STANDARD = 'standard',
}

export const Button = ({className, disable, label, onChange, theme = EButtonTheme.STANDARD, type}: IButtonProps) => {
    const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.dataset.value;

        !disable && !!onChange && onChange(+value);
    };
    return (
        <button
            disabled={disable}
            className={cn(styles.button, styles[theme], styles[className], disable && styles.disable)}
            data-value={label}
            onClick={handleClick}
            type={type || 'button'}
        >
            {label}
        </button>
    );
};
