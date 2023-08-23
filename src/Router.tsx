import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import UserList from './pages/userList';
import MainLayout from "./layouts/MainLayout";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/userList" element={<UserList />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;