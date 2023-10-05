import styles from 'Components/SortFilter/SortFilter.module.css';
import {SortFilterItem} from 'Components/SortFilter/SortFilterItem';
import {ESortFilter} from 'Pages/Catalog/Catalog';
import React from 'react';

interface IFilterPanelProps {
    filters: string[];
    selected: ESortFilter;
    onChangeFilter: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}
export const SortFilter = ({filters, selected, onChangeFilter}: IFilterPanelProps) => {
    return (
        <div className={styles.filterPanel}>
            {filters.map((filter) => (
                <SortFilterItem
                    isSelected={filter === selected}
                    key={filter}
                    label={filter}
                    onChangeFilter={onChangeFilter}
                />
            ))}
        </div>
    );
};
