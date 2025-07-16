import Dashboard from '../dashboard/dashboard';
import Expenses from '../expenses/expenses';
import { Route, Routes } from "react-router-dom";
import Income from '../income/income';
import Categories from '../settings/categories';
import Information from '../settings/information';

function PageRoutes() {

    return (
    <>
        <Routes>
            <Route path="/" Component={() => <Dashboard />} />
            <Route path="/expenses" Component={() => <Expenses />} />
            <Route path="/income" Component={() => <Income />} />
            <Route path="/settings/categories" Component={() => <Categories />} />
            <Route path="/settings/information" Component={() => <Information />} />
        </Routes>    
    </>
    )
}

export default PageRoutes;