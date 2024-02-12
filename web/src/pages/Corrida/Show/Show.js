import React from "react";
import { useParams } from "react-router-dom";

import UIContainer from '../../../componentes/UI/Container/Container';
import CorridaShow from "../../../componentes/Corrida/Show/Show";

const PagesCorridaShow = () => {
    const { id } = useParams();

    return (
        <UIContainer>
            <CorridaShow id={id} />
        </UIContainer>
    );
};

export default PagesCorridaShow;