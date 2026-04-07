import React from 'react'
import '../App.css'
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router'
import Blogs from '../pages/Blogs'
import AddEdit from '../pages/Blogs/AddEdit'

const router = createBrowserRouter([
  { path: "/", element: <Blogs /> },
  { path: "/blogs/add", element: <AddEdit mode="add" /> },
  { path: "/blogs/edit/:id", element: <AddEdit mode="edit" /> }
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router