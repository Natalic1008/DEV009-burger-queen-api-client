import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OrderList from './pages/Waiter/OrdersList.tsx';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import OrderHistory from './pages/Waiter/OrderHistory.tsx';


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
        path: "new",
        element: <OrderList />,
      },
      {
        path:"orders",
        element:<OrderHistory/>
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
