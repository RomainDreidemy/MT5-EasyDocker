import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import StacksPage from "../views/pages/StacksPage";
import StackPage from "../views/pages/StackPage";


export const router = createBrowserRouter([
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "stacks",
        element: <StacksPage />,
    },
    {
        path: "stacks/:id",
        element: <StackPage />,
    }
]);
