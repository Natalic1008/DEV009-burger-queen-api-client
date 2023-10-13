import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/login.tsx';
import OrderList from './pages/Waiter/OrdersList.tsx';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/waiter",
    element: <App/>,
    children: [
      
      {
        path: "orders",
        element: <OrderList />,
      },
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
