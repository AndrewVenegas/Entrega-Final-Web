import UserWelcome from "../../../profile antiguo/UserWelcome";
import LogoutButton from "./Logout.jsx";
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../auth/AuthContext";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import './Miperfil.css';
import API_URL from "../../config.js";

// Hacer esta ruta protegida!
export default function MiPerfil() {
  const { token } = useContext(AuthContext);
  const {isPasajero, setIsPasajero} = useContext(AuthContext);
  const navigate = useNavigate();

  // Verificar si hay un token

  // Obtener el ID del usuario del payload del token
  const [pasajero, setPasajero] = useState({});
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const userId = tokenPayload.sub;
  const userIdInteger = parseInt(tokenPayload.sub, 10);
  const {logout} = useContext(AuthContext);

  const [consultaExistente, setConsultaExistente] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState(null);

  const config_get_solicitudes = {
    'method': 'get',
    'url': `${API_URL}/solicitud_chofer/all`,
    'headers': {
        'Authorization': `Bearer ${token}`
    }
  };
  

  useEffect(() => {
    
    // Decodificar el token para obtener el ID del usuario
    // Realizar la solicitud HTTP para obtener la información del pasajero
    console.log("El id del usuario es:", userId)
    axios.get(`${API_URL}/pasajeros/${userId}`)
      .then((response) => {
        // Verificar si el componente aún está montado antes de actualizar el estado
        if (response.data) {
          
          setPasajero(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

      axios(config_get_solicitudes)
      .then((response) => {
        const solicitudesPorUsuario = response.data.filter((dato) => dato.id_pasajero === userIdInteger);
        console.log(response.data[0].id_pasajero);
        console.log(solicitudesPorUsuario)
        if (solicitudesPorUsuario.length > 0) {
          setConsultaExistente(true);
          setIdSolicitud(solicitudesPorUsuario[0].id);
          console.log("Existe una solicitud para este usuario");
        } else {
          setConsultaExistente(false);
          console.log("No existe una solicitud para este usuario");
        }
      })
      .catch((error) => {
        console.log(error);
        setConsultaExistente(false);
      });
  
    // No es necesario devolver una función de limpieza vacía aquí
  }, []);

  const handleclickedit = () => {
    navigate("/editar-perfil");
  }
  const handleclickchofer = () => {
    navigate("/solicitud-chofer");
  }

  const handleClickVerAutos = () => {
    navigate("/mis-autos");
  }

  const handleClickCancelarSolicitud = () => {
    
    const config_delete_solicitud = {
      'method': 'delete',
      'url': `${API_URL}/solicitud_chofer/${idSolicitud}`,
      'headers': {
          'Authorization': `Bearer ${token}`
      }
    };
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar tu solicitud?`);
      
        if (confirmacion) {
          try {
            const response = axios(config_delete_solicitud)
            .then((response) => {
              // Verificar si el componente aún está montado antes de actualizar el estado
              if (response.data) {
                console.log("respuesta:", response.data.message);
                setConsultaExistente(false);
                setIdSolicitud(null);
              }
            })
            .catch((error) => {
              console.log(error);
            });
            
          } catch (error) {
            
            console.log(error);
          }
          console.log("Pareciera que se eliminó el usuario");
      };
    }

  const handleEliminarCuenta = async() => { 
      let huboError = false;
      
      try {
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar tu cuenta?`);
        
        if (confirmacion) {
          const response = await axios.delete(`${API_URL}/pasajeros/${userId}`);
    
          if (response.data) {
            console.log("Respuesta:", response.data.message);
            setConsultaExistente(false);
            setIdSolicitud(null);
            navigate("/");
            logout();
          }
        } else {
          console.log("El usuario canceló la eliminación");
        }
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        huboError = true;
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
                    <h5 class="mt-2 mb-0">{pasajero.nombre}</h5>
                    <span>{pasajero.email}</span>
                    
                    <div class="px-4 mt-1">
                        <p class="fonts">Número de contacto: {pasajero.telefono} </p>
                    
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
                        {!consultaExistente &&!isPasajero && !pasajero.es_conductor && <button className="btn btn-outline-primary px-4 ms-3" onClick = {handleclickchofer}>Convertirme en chofer </button>}
                        {consultaExistente &&!isPasajero && !pasajero.es_conductor && <button className="btn btn-outline-primary px-4 ms-3" onClick = {handleClickCancelarSolicitud}>Cancelar solicitud de chofer</button>}
                        {pasajero.es_conductor && <button className="btn btn-outline-primary px-4 ms-3" onClick={handleClickVerAutos}>Ver mis autos</button>}

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




      
        

