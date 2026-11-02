import React from 'react'
import '../App.css'
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate } from 'react-router'
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PublicsRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
const Login = React.lazy(() => import("../pages/Login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Blogs = React.lazy(() => import("../pages/Blogs/index"));
const Imageuploaders = React.lazy(() => import("../pages/Imageuploaders/index"));

const router = createBrowserRouter([
  { path: "/login", element: <PublicsRoute><Login /></PublicsRoute> },
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404! Page not found</div>,
    children: [
      { index: true, element: <Navigate to={`/dashboard`} replace /> },
      { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "/blogs", element: <ProtectedRoute><Blogs /></ProtectedRoute> },
      { path: "/image-uploader", element: <ProtectedRoute><Imageuploaders /></ProtectedRoute> },
    ]
  },
], { basename: "/admin" });

const Router = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </React.Suspense>
  )
}

export default Router