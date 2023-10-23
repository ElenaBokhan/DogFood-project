import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {SEARCH_PARAMS_KEY} from 'Components/SearchForm/SearchForm';
import {useDebounce} from 'hooks/useDebounce';
import {UseAppDispatch} from 'Store/hooks';
import {searchProducts} from 'Store/Slices/productList/ProductListSlice';

export const useSearchForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [localSearchValue, setLocalSearchValue] = useState(() => {
        return searchParams.get(SEARCH_PARAMS_KEY) || '';
    });
    const dispatch = UseAppDispatch();

    const debouncedValue = useDebounce({value: localSearchValue, delay: 1e3});

    useEffect(() => {
        dispatch(searchProducts(debouncedValue as string));
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        if (localSearchValue) {
            searchParams.set(SEARCH_PARAMS_KEY, localSearchValue);
        } else {
            searchParams.delete(SEARCH_PARAMS_KEY);
        }
        setSearchParams(searchParams);
    }, [localSearchValue, searchParams, setSearchParams]);

    return [localSearchValue, setLocalSearchValue] as const;
};
