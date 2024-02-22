import React, { useState } from 'react';
import './ExpandedImage.css';

const ExpandedImage = ({ image }) => {
    const [image, setImage] = useState('');

    if (!image) {
        return <div>Carregando...</div>
    }

    function renderItem(item) {
        return (
            <li className='promotion-modal-comments-tree__item'>
                <img 
                    src={item.user.avatarUrl} 
                    alt={`foto de ${item.user.name}`} 
                    className='promotion-modal-comments-tree__item__avatar' 
                />
                <div className='promotion-modal-comments-tree__item__info'>
                    <span className='promotion-modal-comments-tree__item__name'>{item.user.name}</span>
                    <p>{item.comment}</p>
                    <button 
                        type='button'
                        className='promotion-modal-comments-tree__answer-button'
                        onClick={() => {
                            setComment('');
                            setActiveCommentBox(
                                activeCommentBox === item.id ? null : item.id
                            );
                        }}
                    >
                        Responder
                    </button>
                    {activeCommentBox === item.id && (
                        <div className='promotion-modal-comments-tree__comment-box'>
                            <textarea 
                                value={comment} 
                                onChange={(evento) => setComment(evento.target.value)} />
                            <button 
                                type='button'
                                className='promotion-modal-comments-tree__send-button'
                                onClick={() => {
                                    sendComment(comment, item.id);
                                    setComment('');
                                    setActiveCommentBox(null);
                                }}>
                                    Enviar
                            </button>
                        </div>
                    )}
                    {/* Renderizando os comentarios filhos (as respostas)*/}
                    {item.children && renderList(item.children)}
                </div>
            </li>
        );
    }

    function renderList(list) {
        return (
            <ul className='promotion-modal-comments-tree'>{list.map(renderItem)}</ul>
        );
    }

    return renderList(tree);
};

export default ExpandedImage;