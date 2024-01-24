import React from "react";
import { useParams } from "react-router-dom";
import CorridaForm from '../../../componentes/Corrida/Form/Form';
import UIContainer from '../../../componentes/UI/Container/Container';

const PagesCorridaForm = () => {
    const { id } = useParams();

    return (
        <UIContainer>
            <CorridaForm id={id ? parseInt(id, 10) : null} />
        </UIContainer>
    );
};

export default PagesCorridaForm;