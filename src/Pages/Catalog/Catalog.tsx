import {LoadMore} from 'Components/Common/LoadMore/LoadMore';
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
import {changePage} from 'Store/Slices/productList/ProductListSlice';
import {getSortingProducts} from 'Utils/utils';

const isGetListByPaginate = false;

export const Catalog = withProtection(() => {
    const [productList, setProductList] = useState<IProduct[]>([]);

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
        const sortingProducts = getSortingProducts(productList, sortFilter);
        setProductList(sortingProducts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortFilter]);

    useEffect(() => {
        dispatch(setLoading(isFetching));
    }, [dispatch, isFetching]);

    const handleGetMore = () => {
        dispatch(changePage(filter.page + 1));
    };

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
    const isEndList = productList?.length >= total;

    return (
        <>
            {showSearchResultText && searchResultText()}
            <SortFilter />
            {showNotFound && <NotFound />}
            {!!products && <ProductList products={productList} />}
            {products?.length > 0 &&
                (isGetListByPaginate ? (
                    <Pagination currentPage={filter.page} total={total} />
                ) : (
                    !isFetching && <LoadMore action={handleGetMore} isEnd={isEndList} />
                ))}
        </>
    );
});
