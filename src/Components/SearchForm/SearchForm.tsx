import searchIcon from 'assets/ic-close-input.svg';
import {IconButton} from 'Components/Common/IconButton/IconButton';
import styles from 'Components/SearchForm/SearchForm.module.css';
import {useSearchForm} from 'hooks/useSearchForm';
import {FormEvent} from 'react';
import {UseAppDispatch} from 'Store/hooks';
import {searchProducts} from 'Store/Slices/productList/ProductListSlice';

export const SEARCH_PARAMS_KEY = 'query';

export const SearchForm = () => {
    const [search, setSearch] = useSearchForm();

    const dispatch = UseAppDispatch();

    const handleSubmit = (event: FormEvent) => {
        dispatch(searchProducts(search));
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
