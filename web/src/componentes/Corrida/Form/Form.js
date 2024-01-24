import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import axios from 'axios';
import useApi from '../../utils/useApi';

const initialValue = {
    title: '',
    date: '',
    imageUrl: '',
    distance: 0
}

const CorridaForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();
    const [load, loadInfo] = useApi({
        url: `http://localhost:5000/corridas/${id}`,
        method: 'GET',
        onCompleted: (response) => {
            setValues(response.data);
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
            // axios.get(`http://localhost:5000/corridas/${id}`)
            //     .then((response) => {
            //         setValues(response.data);
            //     });
            load();
        }
    }, [id]);

    function onChange(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    function onSubmit(event) {
        event.preventDefault();

        // const method = id ? 'put' : 'post';

        // axios[method](`http://localhost:5000/corridas${id ? `/${id}` : ''}`, values)
        //     .then((response) => {
        //         navigate('/');
        //     });
        save();
    }

    return (
        <div>
            <h1>Minhas Corridas</h1>
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
                            <label htmlFor='imageUrl'>Image (URL)</label>
                            <input id='imageUrl' name='imageUrl' type='text' onChange={onChange} value={values.imageUrl} />
                        </div>
                        <div className='corrida-form__footer'>
                            <button type='submit'>Salvar</button>
                            <Link to='/'>Voltar</Link>
                        </div>
                    </form>
                )}
        </div>
    );
};

export default CorridaForm;