import React from 'react';
import CorridaCard from '../Card/Card';
import './List.css';

const CorridaList = ({ loading, corridas, error }) => {
    if (error) {
        return <div>Ops, ocorreu um erro!</div>
    }
    
    if (loading || corridas === null) {
        return <div>Carregando...</div>
    }

    if (corridas.length === 0) {
        return <div>Nenhum resultado encontrado.</div>
    }

    return (
        <div className='corrida-list'>
            {corridas.map((corrida) => (
                <CorridaCard corrida={corrida} />
            ))}
        </div>
    );
}

export default CorridaList;