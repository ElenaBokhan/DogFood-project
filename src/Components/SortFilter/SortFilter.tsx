import styles from 'Components/SortFilter/SortFilter.module.css';
import {SortFilterItem} from 'Components/SortFilter/SortFilterItem';
import {ESortFilter} from 'Pages/Catalog/Catalog';
import React, {useCallback, useState} from 'react';
import {sortProductsList} from 'Slices/productList/ProductListSlice';
import {UseAppDispatch} from 'Store/hooks';

interface IFilterPanelProps {
    filters: string[];
}

export const SortFilter = ({filters}: IFilterPanelProps) => {
    const [sortFilter, setSortFilter] = useState<ESortFilter>(ESortFilter.POPULAR);
    const dispatch = UseAppDispatch();

    const handleChangeSort = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
        const currentFilter = event.currentTarget.dataset.value;
        setSortFilter(currentFilter as ESortFilter);

        dispatch(sortProductsList(currentFilter as ESortFilter));
    }, []);

    return (
        <div className={styles.filterPanel}>
            {filters.map((filter) => (
                <SortFilterItem
                    isSelected={filter === sortFilter}
                    key={filter}
                    label={filter}
                    onChangeFilter={handleChangeSort}
                />
            ))}
        </div>
    );
};
