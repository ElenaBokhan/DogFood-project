import cn from 'classnames';
import styles from 'Components/SortFilter/SortFilter.module.css';
import React from 'react';

interface ISortFilterItemProps {
    isSelected: boolean;
    label: string;
    onChangeFilter: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const SortFilterItem = ({isSelected, label, onChangeFilter}: ISortFilterItemProps) => {
    return (
        <button
            className={cn(styles.filterItem, isSelected && styles.selected)}
            data-value={label}
            onClick={onChangeFilter}
        >
            {label}
        </button>
    );
};
