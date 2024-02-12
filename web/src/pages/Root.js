import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import PagesCorridaSearch from "./Corrida/Search/Search";
import PagesCorridaForm from "./Corrida/Form/Form";
import PagesCorridaShow from "./Corrida/Show/Show";

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PagesCorridaSearch />} />
                <Route path='/create' element={<PagesCorridaForm />} />
                <Route path='/edit/:id' element={<PagesCorridaForm />} />
                <Route path='/show/:id' element={<PagesCorridaShow />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Root;