import searchIcon from 'assets/ic-close-input.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import styles from 'Components/SearchForm/SearchForm.module.css';
import React, {FormEvent, useState} from 'react';

interface ISearchFormProps {
    onSearch: (search: string) => void;
}

export const SearchForm = ({onSearch}: ISearchFormProps) => {
    const [filter, setFilter] = useState<string>('');

    const handleFilterChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const filterText = event.currentTarget.value;

        setFilter(filterText);
    };

    const handleClear = () => {
        setFilter('');
        onSearch('');
    };

    const handleSubmit = (event: FormEvent) => {
        onSearch(filter);
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
