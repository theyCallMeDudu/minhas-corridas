import React, { useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Show.css';
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const initialValueCorrida = {
    title: '',
    date: '',
    capa: '',
    distance: 0,
    fotos: []
}

const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Adiciona a hora no formato ISO
    const formattedDate = format(date, 'dd/MM/yyyy', { timeZone: 'UTC' });
    return formattedDate;
}

const CorridaShow = ({ id }) => {
    const [valuesCorrida, setValuesCorrida] = useState(id ? null : initialValueCorrida);
    // const [valuesFotos, setValuesFotos] = useState([]);

    const [loadCorrida, loadCorridaInfo] = useApi({
      url: `/corridas/${id}`,
      method: 'GET',
      onCompleted: (response) => {
        setValuesCorrida(() => response.data);
        console.log(valuesCorrida);
      }
    });
  
    // const [loadFotos, loadFotosInfo] = useApi({
    //   url: '/fotos',
    //   method: 'GET',
    //   onCompleted: (response) => {
    //     setValuesFotos(response.data.filter(foto => foto.corridaId === parseInt(id)));
    //     console.log(valuesFotos);
    //   }
    // });

    // function filtrarFotos(fotos, idCorrida) {
    //     // console.log(fotos, idCorrida);
    //     return fotos.filter(function(foto) {
    //         console.log('Foto observada: ', foto, 'id corrida na foto: ', foto.corridaId, 'id corrida: ', parseInt(idCorrida));
    //         return foto.corridaId === parseInt(idCorrida);
    //     });
    // }
  
    useEffect(() => {
        if (id) {
            loadCorrida();
        }
    }, [id]);

    //   useEffect(() => {
    //     const fetchFotos = async () => {
    //       if (valuesCorrida !== null) {
    //         await loadFotos();
    //       }
    //     };
      
    //     fetchFotos();
    //   }, [valuesCorrida]);

   

    // Configurações para o carrossel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <h1 className="corrida-show__title">Minhas Corridas</h1>
            <h2>Ver Corrida</h2>

            {!valuesCorrida
                ? (
                    <div>Carregando...</div>
                ) : (
                    <div>
                        <div className="corrida-show__header">
                            <div className="corrida-show__profile">
                                {valuesCorrida.title && valuesCorrida.capa && valuesCorrida.date && valuesCorrida.distance ? (
                                    <img 
                                        src={valuesCorrida.capa}
                                        alt={valuesCorrida.title}
                                        className='corrida-card__image' 
                                    />
                                    ) : (
                                        <p>Aguardando dados...</p>
                                    )}
                            </div>
                            <div className='corrida-show__info'>
                                <h1>{valuesCorrida.title}</h1>
                                {valuesCorrida.date
                                
                                    &&
                                    <div className='corrida-card__date'>
                                        Data: <strong>{formatDate(valuesCorrida.date)}</strong>
                                    </div>
                                }
                                <div className='corrida-card__distance'>
                                    Distância percorrida: <strong>{valuesCorrida.distance}km</strong>
                                </div>
                                {/* <footer className='corrida-card__footer'> */}
                                {/* </footer> */}
                            </div>
                        </div>
                        <div className="corrida-show__subtitle">
                            <h2>📸 Fotos da corrida</h2>
                        </div>
                        <div className='corrida-show__slide__item'>
                            {/* Utilizando o Slider do react-slick */}
                            <Slider {...settings}>
                                {valuesCorrida.foto1 
                                    && 
                                    <div>
                                        <img 
                                            src={valuesCorrida.foto1}
                                            alt={`Foto da corrida ${valuesCorrida.title}`}
                                            className='corrida-show__slide_image' 
                                        />
                                    </div>
                                }
                                {valuesCorrida.foto2 
                                    &&
                                    <div>
                                        <img 
                                            src={valuesCorrida.foto2}
                                            alt={`Foto da corrida ${valuesCorrida.title}`}
                                            className='corrida-show__slide_image' 
                                        />
                                    </div>
                                }
                                {valuesCorrida.foto3 
                                    &&
                                    <div>
                                        <img 
                                            src={valuesCorrida.foto3}
                                            alt={`Foto da corrida ${valuesCorrida.title}`}
                                            className='corrida-show__slide_image' 
                                        />
                                    </div>
                                }
                            </Slider>
                        </div>
                        <div className="corrida-show__footer">
                            <Link to='/' className="corrida-show__link">Voltar</Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default CorridaShow;