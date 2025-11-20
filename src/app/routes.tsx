import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Home from "../pages/Home";
import Boards from "../pages/Boards";
import Login from "../pages/Login";
import BoardDetails from "../pages/BoardDetails";


const MainLayout : React.FC = ()=>{
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    )
}

const router = createBrowserRouter([
    {
        element : <MainLayout/>,
        children : [
            {path: '/', element: <Home/> },
            {path: '/boards', element: <Boards/> },
            {path: '/boards/:id', element: <BoardDetails/> },
            {path: '/login', element: <Login/> }
        ]
    }
]);


export const AppRoutes : React.FC = ()=>{
    return <RouterProvider router={router}/>
}
