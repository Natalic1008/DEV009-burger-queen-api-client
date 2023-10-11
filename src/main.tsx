import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import{RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './routes/Login/login.tsx'
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/waiter",
    element: <App/>,
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
