import {useEffect, useState} from 'react';

interface UseDebounceParams<ValueType> {
    value: ValueType;
    delay: number;
}

export const useDebounce = <ValueType = unknown>({value, delay}: UseDebounceParams<ValueType>) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    }, [delay, value]);

    return debouncedValue;
};
