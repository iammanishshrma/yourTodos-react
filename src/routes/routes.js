import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../shared/layouts/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import AddTodo from "../pages/addTodo/AddTodo";
import SignUp from "../pages/authenticate/SignUp";
import LogIn from "../pages/authenticate/LogIn";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/add-todo",
                element: (
                    <ProtectedRoute to="/add-todo">
                        <AddTodo />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/edit-todo/:id",
                element: (
                    <ProtectedRoute to="/edit-todo/:id">
                        <AddTodo />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute to="/profile">
                        <h1>Profile</h1>,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthRoute>
                        <SignUp />
                    </AuthRoute>
                ),
            },
            {
                path: "/login",
                element: (
                    <AuthRoute>
                        <LogIn />,
                    </AuthRoute>
                ),
            },
        ],
    },
]);

export default routes;
