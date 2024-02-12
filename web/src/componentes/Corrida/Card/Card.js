import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import { format } from 'date-fns';

const CorridaCard = ({ corrida, onClickDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00'); // Adiciona a hora no formato ISO
        const formattedDate = format(date, 'dd/MM/yyyy', { timeZone: 'UTC' });
        return formattedDate;
    }

    return (
        <div className='corrida-card'>
            <div className='corrida-card__folder'>
                <Link to={`/show/${corrida.id}`}>
                    <img 
                        src={corrida.capa}
                        alt={corrida.title}
                        className='corrida-card__image' />
                </Link>
            </div>
            <div className='corrida-card__info'>
                <h1 className='corrida-card__title'>{corrida.title}</h1>
                <div className='corrida-card__number__info'>
                    {corrida.date
                        &&
                        <div className='corrida-card__date'>
                            {formatDate(corrida.date)}
                        </div>
                    }
                    <div className='corrida-card__distance'>{corrida.distance}km</div>
                </div>
                <footer className='corrida-card__footer'>
                    <Link to={`/show/${corrida.id}`} className='corrida-card__link'>Ver</Link>
                    <Link to={`/edit/${corrida.id}`} className='corrida-card__link'>Editar</Link>
                </footer>
                <button 
                    type="button"
                    onClick={onClickDelete}
                    className='corrida-card__link__delete'>
                        <BiTrash />
                </button>
            </div>
        </div>
    );
}

export default CorridaCard;