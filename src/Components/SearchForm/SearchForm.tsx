import searchIcon from 'assets/ic-close-input.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import styles from 'Components/SearchForm/SearchForm.module.css';
import {useActions} from 'hooks/hooks';
import {useSearchForm} from 'hooks/useSearchForm';
import {FormEvent} from 'react';

export const SEARCH_PARAMS_KEY = 'query';

export const SearchForm = () => {
    const [search, setSearch] = useSearchForm();

    const {searchProducts} = useActions();

    const handleSubmit = (event: FormEvent) => {
        searchProducts(search);
        event.preventDefault();
    };

    const handleFilterChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const filterText = event.currentTarget.value;
        setSearch(filterText);
    };

    const handleClear = () => {
        setSearch('');
    };

    return (
        <div className={styles.searchForm}>
            <form onSubmit={handleSubmit}>
                <input onChange={handleFilterChange} placeholder={'Поиск товаров'} value={search} />
            </form>
            <IconButton alt="searchButton" icon={searchIcon} onClick={handleClear} />
        </div>
    );
};
