import styles from 'Components/SortFilter/SortFilter.module.css';
import {SortFilterItem} from 'Components/SortFilter/SortFilterItem';
import React, {useCallback} from 'react';
import {UseAppDispatch, UseAppSelector} from 'Store/hooks';
import {selectSortFilter} from 'Store/Slices/productList/ProductListSelectors';
import {ESortFilter, setSortFilter} from 'Store/Slices/productList/ProductListSlice';

const filters = ['Популярные', 'Новинки', 'Сначала дешёвые', 'Сначала дорогие', 'По рейтингу', 'По скидке'];

export const SortFilter = () => {
    const dispatch = UseAppDispatch();
    const sortFilter = UseAppSelector(selectSortFilter);

    const handleChangeSort = useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>) => {
            const currentFilter = event.currentTarget.dataset.value;
            dispatch(setSortFilter(currentFilter as ESortFilter));
        },
        [dispatch]
    );

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
