
import { Outlet } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

