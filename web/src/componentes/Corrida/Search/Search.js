import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';
import CorridaList from "../List/List";
import useApi from "../../utils/useApi";

const CorridaSearch = () => {
    const [search, setSearch] = useState('');
    const [load, loadInfo] = useApi({
        url: 'http://localhost:5000/corridas',
        method: 'GET',
        params: {
            _embed: 'fotosCorridas',
            _order: 'desc',
            _sort: 'id',
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
        load();
    }, [search]);

    return (
        <div className='corrida-search'>
            <header className='corrida-search__header'>
                <h1>Minhas Corridas</h1>
                <Link to='/create'>Nova Corrida</Link>
            </header>
            <input 
                type='search'
                className='corrida-search__input'
                placeholder='Buscar'
                value={search}
                onChange={(evento) => setSearch(evento.target.value)} />
            {/* <CorridaList corridas={corridas} loading={!corridas.length} /> */}
            <CorridaList
                corridas={loadInfo.data}
                loading={loadInfo.loading}
                error={loadInfo.error}
            />
        </div>
    );
};

export default CorridaSearch;