import axios from 'axios';
import { useState } from 'react';
import useDebouncedPromise from './useDebouncedPromise';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: null
}

export default function useApi(config) {
    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
    const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay);

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true
        });

        let response = null;

        const finalConfig = {
            baseURL: 'http://localhost:5000',
            ...config,
            ...localConfig,
        }

        const fn = finalConfig.debounced ? debouncedAxios : axios;

        try {
            // response = await axios(config);
            response = await fn(finalConfig);

            setRequestInfo({
                ...initialRequestInfo,
                data: response.data
            });
        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error
            });
        }

        if (config.onCompleted) {
            config.onCompleted(response);
        }
    }

    return [
        call,
        requestInfo
    ]
}