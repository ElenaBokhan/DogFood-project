import {NotFound} from 'Components/Common/NotFound/NotFound';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Pagination} from 'Components/Pagination/Pagination';
import {ProductList} from 'Components/ProductList/ProductList';
import {SortFilter} from 'Components/SortFilter/SortFilter';
import styles from 'Pages/Catalog/Catalog.module.css';
import {useEffect} from 'react';
import {selectFilter, selectProductList} from 'Slices/productList/ProductListSelectors';
import {getProductsList} from 'Slices/productList/ProductListSlice';
import {UseAppDispatch, UseAppSelector} from 'Store/hooks';

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
    const {isLoading, products, total} = UseAppSelector(selectProductList);
    const filter = UseAppSelector(selectFilter);
    const dispatch = UseAppDispatch();
    const {search} = filter;

    useEffect(() => {
        dispatch(getProductsList(filter));
    }, [filter]);

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
            <SortFilter filters={filters} />
            {showNotFound && <NotFound />}
            {!!products && <ProductList products={products} />}
            {products?.length > 0 && <Pagination currentPage={filter.page} total={total} />}
        </>
    );
};
