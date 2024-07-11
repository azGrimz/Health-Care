import { useEffect, useState } from "react"
import blogFetch from "../axios/config";

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogFetch.get(url);
            const json = response.data.listarEmpresas;

            setData(json);
        };
        fetchData();
    }, [url]);

    return { data };
}