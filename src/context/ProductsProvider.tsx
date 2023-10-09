import api from 'api/api';
import {PER_PAGE} from 'Const';
import {ESortFilter} from 'Pages/Catalog/Catalog';
import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react';

interface IProps {
    children: React.ReactNode;
}

interface IProductsContext {
    productsList: IProductsList;
    handleSearch: (search: string) => void;
    handleChangePage: (page: number) => void;
    handleChangeSort: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
    currentPage: number;
    search: string;
    sortFilter: ESortFilter;
}

export const ProductsContext = createContext<IProductsContext>(null);

export const ProductsProvider: React.FC<IProps> = ({children}: IProps) => {
    const [productsList, setProductsList] = useState<IProductsList>(null);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sortFilter, setSortFilter] = useState<ESortFilter>(ESortFilter.POPULAR);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            const data = await api.getProductList({search, page: currentPage, perPage: PER_PAGE});
            setProductsList(data as IProductsList);
            setIsLoading(false);
        };

        getProducts();
    }, [search, currentPage]);

    useEffect(() => {
        if (!productsList?.products) return;
        let sortProducts: IProduct[] = [...productsList.products];

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

        setProductsList((prevState) => ({...prevState, products: sortProducts}));
    }, [sortFilter]);

    const handleSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    const handleChangePage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleChangeSort = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
        const newFilter = event.currentTarget.dataset.value;

        setSortFilter(newFilter as ESortFilter);
    }, []);

    const productValue = useMemo(
        () => ({
            handleSearch,
            handleChangePage,
            handleChangeSort,
            productsList,
            search,
            isLoading,
            currentPage,
            sortFilter,
        }),
        [search, isLoading, currentPage, sortFilter]
    );

    return <ProductsContext.Provider value={productValue}>{children}</ProductsContext.Provider>;
};
