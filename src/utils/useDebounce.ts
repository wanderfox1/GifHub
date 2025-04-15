import {useState, useEffect} from "react";


export const useDebounce = (value: string, delay: number) => {

    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const timerID = setTimeout(() => {
            setDebouncedValue(value)

        }, delay)

        return () => {clearTimeout(timerID)}
    }, [value, delay])

    return debouncedValue
}