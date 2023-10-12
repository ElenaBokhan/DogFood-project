import searchIcon from 'assets/ic-close-input.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import styles from 'Components/SearchForm/SearchForm.module.css';
import React, {FormEvent, useState} from 'react';
import {searchProducts} from 'Slices/productList/ProductListSlice';
import {UseAppDispatch} from 'Store/hooks';

export const SearchForm = () => {
    const [filter, setFilter] = useState<string>('');

    const dispatch = UseAppDispatch();

    const handleFilterChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const filterText = event.currentTarget.value;

        setFilter(filterText);
    };

    const handleClear = () => {
        setFilter('');
        dispatch(searchProducts(''));
    };

    const handleSubmit = (event: FormEvent) => {
        dispatch(searchProducts(filter));
        event.preventDefault();
    };

    return (
        <div className={styles.searchForm}>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFilterChange} placeholder={'Поиск товаров'} value={filter} />
            </form>
            <IconButton alt="searchButton" icon={searchIcon} onClick={handleClear} />
        </div>
    );
};
