import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import Routing from './Routing.jsx'
import AuthProvider from '../auth/AuthProvider.jsx'
// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Este archivo lo que hace es importar el componente Routing ubicado en carpeta "common"
// Luego, se renderiza todo lo que está en dicho componente, que hace el enlace entre las rutas y 
// los componentes
ReactDOM.createRoot(document.getElementById('root')).render(
  // Como componente padre de routing vamos a tener a AuthProvider
  // entonces, cualquier componente que esté dentro del routing puede acceder al token, setToken y logout.
  <React.StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  </React.StrictMode>,
)
