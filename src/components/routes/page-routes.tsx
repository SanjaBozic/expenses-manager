import Dashboard from '../dashboard/dashboard';
import Deduction from '../deduction/deduction';
import { Route, Routes } from "react-router-dom";
import Income from '../income/income';
import Account from '../settings/account';
import AboutUs from '../settings/about-us';

function PageRoutes() {

    return (
    <>
        <Routes>
            <Route path="/" Component={() => <Dashboard />} />
            <Route path="/deduction" Component={() => <Deduction />} />
            <Route path="/income" Component={() => <Income />} />
            <Route path="/account" Component={() => <Account />} />
            <Route path="/aboutus" Component={() => <AboutUs />} />
        </Routes>    
    </>
    )
}

export default PageRoutes;