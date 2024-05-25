import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NotFound from "./not-found.jsx";
import Home from "./pages/Home/home.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

 const router = createBrowserRouter([
  {/*{
    path: "/",
    element: <Navigate to="/en93/" replace />
  },*/},
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [{
      path: "/",
      element: <Home />
    }]
  }
 ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
