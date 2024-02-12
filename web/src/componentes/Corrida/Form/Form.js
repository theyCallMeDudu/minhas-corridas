import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import useApi from '../../utils/useApi';

const initialValue = {
    title: '',
    date: '',
    capa: '',
    distance: 0,
    foto1: '',
    foto2: '',
    foto3: ''
}

const CorridaForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();
    const [load, loadInfo] = useApi({
        url: `/corridas/${id}`,
        method: 'GET',
        onCompleted: (response) => {
            setValues(response.data);
            console.log(response);
        }
    });

    const [save, saveInfo] = useApi({
        url: id ? `http://localhost:5000/corridas/${id}` : 'http://localhost:5000/corridas',
        method: id ? 'PUT' : 'POST',
        data: values,
        onCompleted:(response) => {
            console.log(response);
            if (!response.error) {
                navigate('/');
            }
        }
    });

    useEffect(() => {
        if (id) {
            load();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    function onChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function onSubmit(event) {
        event.preventDefault();
        save();
    }

    return (
        <div>
            <h1 className='corrida-form__title'>Minhas Corridas</h1>
            { !id ? ( <h2>Nova Corrida</h2> ) : ( <h2>Editar Corrida</h2> ) }

            {!values
                ? (
                    <div>Carregando...</div>
                ) : (
                    <form onSubmit={onSubmit}>
                        {saveInfo.loading && <span>Salvando dados...</span>}
                        <div className='corrida-form__group'>
                            <label htmlFor='title'>Título</label>
                            <input id='title' name='title' type='text' onChange={onChange} value={values.title} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='date'>Data</label>
                            <input id='date' name='date' type='date' onChange={onChange} value={values.date} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='distance'>Distância</label>
                            <input id='distance' name='distance' type='number' onChange={onChange} value={values.distance} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='capa'>Imagem capa (URL)</label>
                            <input id='capa' name='capa' type='text' onChange={onChange} value={values.capa} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='foto1'>Foto 1 (URL)</label>
                            <input id='foto1' name='foto1' type='text' onChange={onChange} value={values.foto1} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='foto2'>Foto 2 (URL)</label>
                            <input id='foto2' name='foto2' type='text' onChange={onChange} value={values.foto2} />
                        </div>
                        <div className='corrida-form__group'>
                            <label htmlFor='foto3'>Foto 3 (URL)</label>
                            <input id='foto3' name='foto3' type='text' onChange={onChange} value={values.foto3} />
                        </div>
                        <div className='corrida-form__footer'>
                            <button 
                                type='submit'
                                className='corrida-form__button'
                            >Salvar</button>
                            <Link to='/' className='corrida-form__link'>Voltar</Link>
                        </div>
                    </form>
                )}
        </div>
    );
};

export default CorridaForm;