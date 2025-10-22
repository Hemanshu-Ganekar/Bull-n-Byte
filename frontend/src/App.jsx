import LoginPage from './pages/LoginPage.jsx'
import Signin from './pages/Signin.jsx'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from './pages/navbar.jsx'

function App() {
  return (
    <div className='bg-green-100 min-h-[100vh] min-w-full'>
      <Navbar/>
       <Outlet/>
    </div>
  )
}

export default App
