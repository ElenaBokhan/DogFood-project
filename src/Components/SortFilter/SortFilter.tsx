import styles from 'Components/SortFilter/SortFilter.module.css';
import {SortFilterItem} from 'Components/SortFilter/SortFilterItem';
import {useActions} from 'hooks/hooks';
import React, {useCallback} from 'react';
import {UseAppSelector} from 'Store/hooks';
import {selectSortFilter} from 'Store/Slices/productList/ProductListSelectors';
import {ESortFilter} from 'Store/Slices/productList/ProductListSlice';

const filters = ['Популярные', 'Новинки', 'Сначала дешёвые', 'Сначала дорогие', 'По рейтингу', 'По скидке'];

export const SortFilter = () => {
    const {setSortFilter} = useActions();
    const sortFilter = UseAppSelector(selectSortFilter);

    const handleChangeSort = useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>) => {
            const currentFilter = event.currentTarget.dataset.value;
            setSortFilter(currentFilter as ESortFilter);
        },
        [setSortFilter]
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
