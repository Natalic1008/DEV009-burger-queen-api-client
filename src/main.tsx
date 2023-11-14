import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OrderList from './pages/Waiter/OrdersList.tsx';
import App from './App.tsx';
import Login from './pages/Login/Login.tsx';
import OrderHistory from './pages/Waiter/OrderHistory.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Products from './pages/Admin/Products.tsx';
import Users from './pages/Admin/Users.tsx';
import AllOrders from './pages/Admin/AllOrders.tsx';
import ActiveOrders from './pages/Cheff/ActiveOrders.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <AllOrders />,
      },
    ],
  },
  {
    path: "/waiter",
    element: <App/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "new",
        element: <OrderList />,
      },
      {
        path:"orders",
        element:<OrderHistory/>
      }
    ]
  },
  {
    path: "/chef",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <ActiveOrders/>,
      }
    ],
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
