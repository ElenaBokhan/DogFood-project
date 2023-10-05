import cn from 'classnames';
import styles from 'Components/Common/Text/Text.module.css';
import React from 'react';

interface ITextProps {
    className?: string;
    fontColor?: EFontColor;
    size?: ETextSize;
    type?: EFontType;
    value?: string | number;
    children?: React.ReactNode;
}

export enum EFontType {
    GENERAL = 'bold',
    SECONDARY = 'normal',
}

export enum EFontColor {
    RED = 'red',
    BLACK = 'black',
    GREY = 'grey',
}

export enum ETextSize {
    S14 = 'size14',
    S20 = 'size20',
    S28 = 'size28',
    S9 = 'size9',
    S12 = 'size12',
    S16 = 'size16',
}

export const Text = ({
    children,
    fontColor = EFontColor.BLACK,
    size = ETextSize.S20,
    type = EFontType.SECONDARY,
    value,
    className,
}: ITextProps) => {
    return (
        <p className={cn(className, styles[fontColor], styles[size], styles[type])}>
            {value}
            {children}
        </p>
    );
};
