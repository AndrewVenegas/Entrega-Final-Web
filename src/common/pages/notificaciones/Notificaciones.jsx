import TarjetaNotificacion from "./TarjetaNotificaciones"
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../auth/AuthContext.jsx";
import API_URL from "../../config.js";
import axios from "axios";


export default function Notificaciones() {


  const {token, setToken} = useContext(AuthContext);
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const userId = tokenPayload.sub;
  const [notificaciones, setNotificaciones] = useState([])
  const {isPasajero, setIsPasajero} = useContext(AuthContext);

  const config_get = {
    'method': 'get',
    'url': `${API_URL}/notificaciones/usuario/${userId}`,
    'headers': {
        'Authorization': `Bearer ${token}`
        },
  };

  useEffect(() => {
    axios(config_get)
    .then( (response) => {
        if (response.data) {
            setNotificaciones(response.data);
            console.log(response.data)
        }
    } ).catch((error) => {
        console.log(error);
    })
}, []);
  

  return (
    <div>
      {(notificaciones.length === 0) && <h3>Aún no tienes notificaciones</h3>}
      {notificaciones
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map( notificacion => (
        <div className="column" key={notificacion.id}>
          {isPasajero && notificacion.tipo === "chofer" &&
          <TarjetaNotificacion 
            id_viaje={notificacion.id_viaje} 
            tipo={notificacion.tipo} 
            titulo={notificacion.titulo} 
            contenido={notificacion.contenido}
            header={notificacion.header}>
          </TarjetaNotificacion>
          }
          {!isPasajero && notificacion.tipo === "pasajero" &&
          <TarjetaNotificacion 
            id_viaje={notificacion.id_viaje} 
            tipo={notificacion.tipo} 
            titulo={notificacion.titulo} 
            contenido={notificacion.contenido}
            header={notificacion.header}>
          </TarjetaNotificacion>
          }
        <br></br>
        </div>
      ))}
    </div>
  )
}
