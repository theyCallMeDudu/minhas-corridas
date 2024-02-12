import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './Search.css';
import CorridaList from "../List/List";
import useApi from "../../utils/useApi";

const baseParams = {
    _embed: 'fotosCorridas',
    _order: 'desc',
    _sort: 'id',
};

const CorridaSearch = ({ id }) => {
    const mountRef = useRef(null);
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({
        // url: 'http://localhost:5000/corridas',
        debouncedDelay: 300,
        url: '/corridas',
        method: 'GET',
        params: {
            ...baseParams,
            title_like: search || undefined
        },
        // onCompleted: (response) => {
        //     setCorridas(response.data);
        // }
    });

    useEffect(() => {
        // const params = {};
        // if (search) {
        //     params.title_like = search;
        // }

        // // axios.get('http://localhost:5000/corridas', { params })
        // axios.get('http://localhost:5000/corridas?_order=desc&_sort=id', { params })
        //     .then((response) => {
        //         setCorridas(response.data);
        //     });
        load({
            debounced: mountRef.current,
        });

        if (!mountRef.current) {
            mountRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div className='corrida-search'>
            <header className='corrida-search__header'>
                <h1>Minhas Corridas</h1>
                <div className="corrida-search__nav">
                    <Link to='/create' className="corrida-search__link">Nova Corrida</Link>
                </div>
            </header>
            <input 
                type='search'
                className='corrida-search__input'
                placeholder='Buscar'
                value={search}
                onChange={(evento) => setSearch(evento.target.value)} />
            <CorridaList
                corridas={loadInfo.data}
                loading={loadInfo.loading}
                error={loadInfo.error}
                refetch={() => {
                    load({
                        params: baseParams,
                    });
                }}
            />
        </div>
    );
};

export default CorridaSearch;