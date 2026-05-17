import React from 'react'
import '../App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router'
import Blogs from '../pages/Blogs'
import AddEdit from '../pages/Blogs/AddEdit'
import Imageuploaders from '../pages/Imageuploaders'

const router = createBrowserRouter([
  { path: "/", element: <Blogs /> },
  { path: "/blogs/add", element: <AddEdit mode="add" /> },
  { path: "/blogs/edit/:id", element: <AddEdit mode="edit" /> },
  { path: "/image-uploader", element: <Imageuploaders /> },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router