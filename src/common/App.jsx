//import reactLogo from './../assets/react.svg' // este está en assets
//import viteLogo from '/vite.svg'  // Este está en public
//import './App.css'
import Navbar from './Navbar'
import NavbarAdmin from './NavbarAdmin';
import './navbarStyles.css'
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext'

function App() {
  const {isAdmin, setIsAdmin} = useContext(AuthContext);


  return (
    <>
      {!isAdmin ? <Navbar /> : <NavbarAdmin />}
    </>
  )
}

export default App
