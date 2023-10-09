import {NotFound} from 'Components/Common/NotFound/NotFound';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Pagination} from 'Components/Pagination/Pagination';
import {ProductList} from 'Components/ProductList/ProductList';
import {SortFilter} from 'Components/SortFilter/SortFilter';
import {ProductsContext} from 'context/ProductsProvider';
import styles from 'Pages/Catalog/Catalog.module.css';
import {useContext} from 'react';

export enum ESortFilter {
    POPULAR = 'Популярные',
    NEW = 'Новинки',
    CHEAPER_FIRST = 'Сначала дешёвые',
    EXPENSIVE_FIRST = 'Сначала дорогие',
    RATING = 'По рейтингу',
    DISCOUNT = 'По скидке',
}

const filters = ['Популярные', 'Новинки', 'Сначала дешёвые', 'Сначала дорогие', 'По рейтингу', 'По скидке'];

export const Catalog = () => {
    // const handleLoading = useContext(LoadingContext);
    // const {productsList, handleChangePage, handleChangeSort, search, currentPage, isLoading, sortFilter} =
    //     useContext(ProductsContext);
    // const {products, total} = productsList;

    const data = useContext(ProductsContext);
    const {productsList, handleChangePage, handleChangeSort, search, currentPage, isLoading, sortFilter} = data || {};
    const {products, total} = productsList || {};

    const searchResultText = () => {
        const text = (
            <span>
                По запросу <b>{search}</b> найдено {products?.length} товаров
            </span>
        );

        return (
            <div className={styles.searchResultText}>
                <Text type={ETextType.H1} weight={EFontWeight.SECONDARY}>
                    {text}
                </Text>
            </div>
        );
    };

    const showNotFound = search && products?.length === 0 && !isLoading;
    const showSearchResultText = search && !isLoading;

    return (
        <>
            {showSearchResultText && searchResultText()}
            <SortFilter filters={filters} onChangeFilter={handleChangeSort} selected={sortFilter} />
            {showNotFound && <NotFound />}
            {products && <ProductList products={products} />}
            {products?.length > 0 && <Pagination currentPage={currentPage} onChange={handleChangePage} total={total} />}
        </>
    );
};
