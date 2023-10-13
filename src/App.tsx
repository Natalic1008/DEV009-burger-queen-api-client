
import { Outlet } from 'react-router-dom'
import './App.css'


export default function App() {
  return (
    <>
      <header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

