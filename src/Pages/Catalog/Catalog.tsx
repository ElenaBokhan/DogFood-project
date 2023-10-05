import searchNotFound from 'assets/ic-notfound.svg';
import {Button, EButtonType} from 'Components/Common/Button/Button';
import {LoadingContext} from 'Components/Common/Container/Container';
import {ETextSize, Text} from 'Components/Common/Text/Text';
import {Pagination} from 'Components/Pagination/Pagination';
import {IProduct} from 'Components/ProductItem/ProductItem';
import {SortFilter} from 'Components/SortFilter/SortFilter';
import productsDB from 'db/db.json';
import styles from 'Pages/Catalog/Catalog.module.css';
import {ProductList} from 'Pages/ProductList/ProductList';
import React, {useCallback, useContext, useEffect, useState} from 'react';

interface IProductsList {
    products: IProduct[];
    total: number;
}

interface ICatalogProps {
    search: string;
}
export enum ESortFilter {
    POPULAR = 'Популярные',
    NEW = 'Новинки',
    CHEAPER_FIRST = 'Сначала дешёвые',
    EXPENSIVE_FIRST = 'Сначала дорогие',
    RATING = 'По рейтингу',
    DISCOUNT = 'По скидке',
}

const filters = ['Популярные', 'Новинки', 'Сначала дешёвые', 'Сначала дорогие', 'По рейтингу', 'По скидке'];

export const Catalog = ({search}: ICatalogProps) => {
    const [products, setProducts] = useState<IProduct[]>(null);
    const [sortFilter, setSortFilter] = useState<ESortFilter>(ESortFilter.POPULAR);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(null);

    const handleLoading = useContext(LoadingContext);

    useEffect(() => {
        const getProducts = () => {
            setIsLoading(true);
            // eslint-disable-next-line prefer-const
            let {products, total}: IProductsList = productsDB;

            handleLoading(true);
            setTimeout(() => {
                setIsLoading(false);

                if (search) {
                    products = products.filter(({name}) => name.includes(search));
                }

                setProducts(products);
                setTotal(total);
                handleLoading(false);
            }, 3000);
        };

        getProducts();
    }, [search]);

    useEffect(() => {
        if (!products) return;
        let sortProducts: IProduct[] = [...products];

        switch (sortFilter) {
            case ESortFilter.POPULAR:
                break;
            case ESortFilter.NEW:
                break;
            case ESortFilter.CHEAPER_FIRST:
                sortProducts = sortProducts.sort((first, second) => first.price - second.price);
                break;
            case ESortFilter.EXPENSIVE_FIRST:
                sortProducts = sortProducts.sort((first, second) => second.price - first.price);
                break;
            case ESortFilter.DISCOUNT:
                sortProducts = sortProducts.sort((first, second) => second.discount - first.discount);
                break;
            case ESortFilter.RATING:
                break;
        }

        setProducts(sortProducts);
    }, [sortFilter]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeSort = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
        const newFilter = event.currentTarget.dataset.value;

        setSortFilter(newFilter as ESortFilter);
    }, []);

    const searchResultText = () => {
        const text = (
            <span>
                По запросу <b>{search}</b> найдено {products.length} товаров
            </span>
        );

        return (
            <div className={styles.searchResultText}>
                <Text size={ETextSize.S28}>{text}</Text>
            </div>
        );
    };

    const renderSearchNotFound = () => {
        return (
            <div className={styles.searchNotFound}>
                <img alt="searchNotFound" src={searchNotFound} />
                <Text value="Простите, по вашему запросу товаров не надено." />
                <Button label="На главную" type={EButtonType.REDIRECT} />
            </div>
        );
    };

    const showNotFound = search && products?.length === 0 && !isLoading;
    const showSearchResultText = search && !isLoading;

    return (
        <>
            {showSearchResultText && searchResultText()}
            <SortFilter filters={filters} onChangeFilter={handleChangeSort} selected={sortFilter} />
            {showNotFound && renderSearchNotFound()}
            <ProductList products={products} />
            {products?.length > 0 && <Pagination currentPage={currentPage} onChange={handleChangePage} total={total} />}
        </>
    );
};
