import React from 'react';
import {Route, Routes} from 'react-router-dom';

import HeroList from "../components/HeroList/HeroList";
import HeroDetails from "../components/HeroDetails/HeroDetails";

const AppRoutes: React.FC = () => (
    <Routes>
        <Route index element={<HeroList />} />
        <Route path='/hero/:id' element={<HeroDetails />} />
    </Routes>
);

export default AppRoutes;