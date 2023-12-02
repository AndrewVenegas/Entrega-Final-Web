
import LogoutButton from "../../profile/Logout.jsx";
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import './MiPerfilAdmin.css';
import API_URL from "../../../config.js";


// Hacer esta ruta protegida!
export default function MiPerfil() {
  const { token } = useContext(AuthContext);
  const {isAdmin, setIsAdmin} = useContext(AuthContext);
  const navigate = useNavigate();

  // Verificar si hay un token

  // Obtener el ID del usuario del payload del token
  const [admin, setAdmin] = useState({});
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const adminID = tokenPayload.sub;
  const {logout} = useContext(AuthContext);


  const config_get = {
    'method': 'get',
    'url': `${API_URL}/admin/${adminID}`,
    'headers': {
        'Authorization': `Bearer ${token}`
    }
  };

  const config_delete = {
    'method': 'delete',
    'url': `${API_URL}/admin/${adminID}`,
    'headers': {
        'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios(config_get)
      .then((response) => {
        // Verificar si el componente aún está montado antes de actualizar el estado
        console.log("response.data")
        console.log(response.data)
        if (response.data) {
          setAdmin(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
    // No es necesario devolver una función de limpieza vacía aquí
  }, []);

  const handleclickedit = () => {
    navigate("/editar-perfil-admin");
  }

  const handleEliminarCuenta = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
  
    if (confirmacion) {
      let huboerror = false;
      try {
        console.log("Voy a eliminar el usuario");
        const response = await axios(config_delete);
        console.log(response);
      } catch (error) {
        console.log(error);
        huboerror = true;
      }
      console.log("Pareciera que se eliminó el usuario");
      if (!huboerror) {
        navigate("/");
        logout();
      }
    } else {
      console.log("Cancelado");
      // Manejar la cancelación si el usuario decide no eliminar la cuenta
    }
  };

  return (
    <>

    <div class="container mt-5">
    
    <div class="row d-flex justify-content-center">
        
        <div class="col-md-7">
            
            <div class="card p-3 py-4">
                
                <div class="text-center">
                    <div className="card-avatar mx-auto"></div>
                </div>
                
                <div class="text-center mt-3">
                    <h5 class="mt-2 mb-0">{admin.nombre}</h5>
                    <span>{admin.email}</span>
                    
                    <div class="px-4 mt-1">
                        <p class="fonts">¡Bienvenido a tu perfil!</p>
                    
                    </div>
                    
                     <ul class="social-list">
                        <li><i class="fa fa-facebook"></i></li>
                        <li><i class="fa fa-dribbble"></i></li>
                        <li><i class="fa fa-instagram"></i></li>
                        <li><i class="fa fa-linkedin"></i></li>
                        <li><i class="fa fa-google"></i></li>
                    </ul>
                    
                    <div class="buttons">
                        
                        <button className="btn btn-outline-primary px-4" onClick={handleclickedit}>Editar perfil</button>
                    </div>
                  
                    
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    <LogoutButton /> 
    <button onClick={handleEliminarCuenta} className="btn btn-dark" style={{ marginTop: '10px' , marginLeft: '10px'}}>
                Eliminar cuenta
    </button>

    
</div>
      
    </>

  )
}