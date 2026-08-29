import React from 'react'
import '../App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router'
const Login = React.lazy(() => import("../pages/Login"));
const Blogs = React.lazy(() => import("../pages/Blogs/index"));
const Imageuploaders = React.lazy(() => import("../pages/Imageuploaders/index"));

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/image-uploader", element: <Imageuploaders /> },
]);

const Router = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  )
}

export default Router