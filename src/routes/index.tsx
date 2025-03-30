import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import BlogPage from "../pages/BlogPage";
import Authors from "../pages/Authors";
import AuthorPage from "../pages/AuthorPage";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../components/ScrollToTop";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <MainLayout />
            </>
        ),
        children: [
            { path: "", element: <Home /> },
            { path: "blogs", element: <Blogs /> },
            { path: "blogs/:id", element: <BlogPage /> },
            { path: "*", element: <NotFound /> },
            {
                path: "signup",
                element: (
                    <ProtectedRoute>
                        <Signup />
                    </ProtectedRoute>
                )
            },
            {
                path: "login",
                element: (
                    <ProtectedRoute>
                        <Login />
                    </ProtectedRoute>
                )
            },
            { path: "authors", element: <Authors /> },
            { path: "author/:username", element: <AuthorPage /> },
        ],
    },
]);

export default router;
