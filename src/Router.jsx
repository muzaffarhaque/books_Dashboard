import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Books, Dashboard, Home, Layout, Login, ScaleOrder} from './pages';
export default function Router() {
    const router = createBrowserRouter([
     
        {
            path: "/",
            element: <Layout/>,
            children:[
                {
                    path: "/",
                    element:<Dashboard/>
                },
                {
                    path: "/overview",
                    element:<Dashboard/>
                },
                {
                    path: "/search-books",
                    element:<Books/>
                },
                {
                    path: "/scale-order/:type",
                    element:<ScaleOrder/>
                },
            ]
        },
        {
            path: "/onboarding",
            element:<Login/>
        }
    ]);
  return (
    <>
         <RouterProvider router={router}/>
    </>
  )
}
