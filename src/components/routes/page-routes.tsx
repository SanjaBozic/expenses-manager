import Dashboard from '../dashboard/dashboard';
import Expenses from '../expenses/expenses';
import { Route, Routes } from "react-router-dom";
import Income from '../income/income';
import AboutUs from '../settings/about-us';
import Categories from '../settings/categories';

function PageRoutes() {

    return (
    <>
        <Routes>
            <Route path="/" Component={() => <Dashboard />} />
            <Route path="/expenses" Component={() => <Expenses />} />
            <Route path="/income" Component={() => <Income />} />
            <Route path="/settings/categories" Component={() => <Categories />} />
            <Route path="/settings/aboutus" Component={() => <AboutUs />} />
        </Routes>    
    </>
    )
}

export default PageRoutes;