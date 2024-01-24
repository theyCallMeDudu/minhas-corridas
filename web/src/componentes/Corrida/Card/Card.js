import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const CorridaCard = ({ corrida }) => (
    <div className='corrida-card'>
        <div className='corrida-card__image'>
            {/* <Link to={`/corrida/${corrida.id}`}> */}
                <img 
                    src={corrida.imageUrl}
                    alt={corrida.title}
                    className='corrida-card__image' />
            {/* </Link> */}
        </div>
        <div className='corrida-card__info'>
            <h1 className='corrida-card__title'>{corrida.title}</h1>
            <footer className='corrida-card__footer'>
                <span className='corrida-card__date'>{corrida.date}</span>
                <span className='corrida-card__distance'>{corrida.distance}km</span>
                {/* <Link to={`/corrida/${corrida.id}`}>VER</Link> */}
                <Link to={`/edit/${corrida.id}`}>EDITAR</Link>
            </footer>
        </div>
    </div>
);

export default CorridaCard;