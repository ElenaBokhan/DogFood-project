import {NotFound} from 'Components/Common/NotFound/NotFound';
import {EFontWeight, ETextType, Text} from 'Components/Common/Text/Text';
import {Pagination} from 'Components/Pagination/Pagination';
import {ProductList} from 'Components/ProductList/ProductList';
import {SortFilter} from 'Components/SortFilter/SortFilter';
import {withProtection} from 'HOCs/withProtection';
import styles from 'Pages/Catalog/Catalog.module.css';
import {useEffect, useState} from 'react';
import {useProductListQuery} from 'Store/Api/productListApi';
import {UseAppDispatch, UseAppSelector} from 'Store/hooks';
import {setLoading} from 'Store/Slices/loading/Loading';
import {selectFilter, selectSortFilter} from 'Store/Slices/productList/ProductListSelectors';
import {getSortingProducts} from 'Utils/utils';

export enum ESortFilter {
    POPULAR = 'Популярные',
    NEW = 'Новинки',
    CHEAPER_FIRST = 'Сначала дешёвые',
    EXPENSIVE_FIRST = 'Сначала дорогие',
    RATING = 'По рейтингу',
    DISCOUNT = 'По скидке',
}

export const Catalog = withProtection(() => {
    const [productList, setProductList] = useState<IProduct[]>();

    const filter = UseAppSelector(selectFilter);
    const sortFilter = UseAppSelector(selectSortFilter);
    const dispatch = UseAppDispatch();
    const {data, isFetching} = useProductListQuery(filter);
    const {products, total} = data || {};
    const {search} = filter;

    useEffect(() => {
        products && setProductList(products);
    }, [products]);

    useEffect(() => {
        if (productList) {
            const sortingProducts = getSortingProducts(productList, sortFilter);
            setProductList(sortingProducts);
        }
    }, [sortFilter]);

    useEffect(() => {
        dispatch(setLoading(isFetching));
    }, [dispatch, isFetching]);

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

    const showNotFound = search && products?.length === 0 && !isFetching;
    const showSearchResultText = search && !isFetching;

    return (
        <>
            {showSearchResultText && searchResultText()}
            <SortFilter />
            {showNotFound && <NotFound />}
            {!!products && <ProductList products={productList} />}
            {products?.length > 0 && <Pagination currentPage={filter.page} total={total} />}
        </>
    );
});
