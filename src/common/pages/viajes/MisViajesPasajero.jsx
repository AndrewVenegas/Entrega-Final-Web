import API_URL from "../../config";
import { AuthContext } from "../../../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { dividerClasses } from "@mui/material";
import CardViajePasajero from "./CardViajesPasajero/CardViajePasajero";


export default function MisViajesPasajero() {
    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const navigate = useNavigate();
    const [msg, setMsg] = useState();
    const [id_viajes, setId_viajes] = useState([]);

    const [id_viajespasajero, setId_viajespasajero] = useState([]);
    const [viajes, setViajes] = useState([]);
    const [viajesFiltrados, setViajesFiltrados] = useState([]);
    const [viajesEliminados, setViajesEliminados] = useState([]);

    

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const config_del = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    

    const handleClickbajarme = (id_viaje_pasajero, id_viaje) => {
        axios.delete(`${API_URL}/viajes-pasajero/${id_viaje_pasajero}`,config_del)
          .then((response) => {
            const viaje_pasajero = response.data; 
            console.log(`El viaje pasajero eliminado es: `, viaje_pasajero)
            setViajesEliminados((prevEliminados) => [...prevEliminados, id_viaje]);

            // Se realiza un get de viaje para obtener su cantidad de vacantes
            const config_get_viaje = {
                'method': 'get',
                'url': `${API_URL}/viajes/${id_viaje}`,
                'headers': {
                    'Authorization': `Bearer ${token}`
                    }
              };

            axios(config_get_viaje)
            .then((response) => {
              console.log(response.data)
              console.log("get de viaje correcto")
              console.log("vacantes",response.data.vacantes_disponibles)
              const idChofer = response.data.id_conductor

              const config_put_viaje = {
                'method': 'put',
                'url': `${API_URL}/viajes/${id_viaje}`,
                'headers': {
                    'Authorization': `Bearer ${token}`
                    },
                'data': {
                        'vacantes_disponibles': response.data.vacantes_disponibles+1
                    },
              };

            // Se realiza un put del viaje, sumandole una vacante
              axios(config_put_viaje)
            .then((response) => {
              console.log(response.data)
              console.log("put de viaje correcto")
              console.log("vacantes",response.data.vacantes_disponibles)

            // Se relaiza un get de la solicitud que envió
            axios.get(`${API_URL}/solicitudes/user/${userId}/viaje/${id_viaje}`, config)
                .then( (response) => {
                if (response.data) {
                    console.log("response.data", response.data);

                // Se relaiza un delete de la solicitud que envió
                axios.delete(`${API_URL}/solicitudes/${response.data.id}`, config)
                .then( (response) => {
                    if (response.data) {
                        console.log("response.data soli eliminada", response.data);
                        // Se crea la notificación que le avisa al chofe
                        const config_post_notifiacion = {
                            'method': 'post',
                            'url': `${API_URL}/notificaciones`,
                            'headers': {
                                'Authorization': `Bearer ${token}`
                                },
                            'data': 
                                {
                                    'tipo': 'chofer',
                                    'contenido': 'Un pasajero se ha desinscrito de tu viaje. Se ha liberado un cupo.',
                                    'id_pasajero': idChofer,
                                    'header': 'Cambios en tu viaje',
                                    'id_viaje': id_viaje,
                                    'titulo': 'Se han realizado cambios en tu viaje',
                                },
                            }
                        
                            axios(config_post_notifiacion)
                            .then( (response) => {
                                console.log("Se ha creado una notificacion informando al chofer de la baja del pasajero")
                                console.log(response)
                            }). catch( (error) => {
                                console.log("Hubo un error al crear la notificacin de baja de pasajero")
                                console.log(error)
                            })
                        
                    }})
                        .catch((error) => {
                        console.error('Hubo un error en el delete de solicitud', error)}) 
                           }
            }).catch((error) => {
                console.error('Hubo un error en el get de solicitud', error)
                
            })

            }). catch((error) => {
                console.error('Hubo un error en el put de viaje', error)
              })


            }). catch((error) => {
                console.error('Hubo un error en el get de viaje', error)
              })

          })
          .catch((error) => {
            console.error(`Error al eliminar en viaje pasajero`,  error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
          });
      };

    useEffect(() => {
        axios.get(`${API_URL}/viajes-pasajero/user/${userId}`, config)
        .then( (response) => {
            if (response.data) {
                const idViajes = response.data.map((viaje) => viaje.id_viaje);
                setId_viajes(idViajes);
                const idViajespasajero = response.data.map((viaje) => viaje.id);
                setId_viajespasajero(idViajespasajero);
                console.log("respuesta", response.data)

                axios.get(`${API_URL}/viajes`, config)
                .then( (response) => {
                    if (response.data) {
                        
                        console.log("respuesta", response.data)
                        const viajes = response.data.filter((viaje) => idViajes.includes(viaje.id));
                            // Hacer algo con los viajes filtrados, por ejemplo, establecerlos en el estado viajes
                        setViajes(viajes);
                    }
                    console.log(id_viajes)
                } ).catch((error) => {
                    console.log(error);
                })    
            }
            console.log(id_viajes)
        } ).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        // Filtrar los viajes directamente basándose en viajesEliminados
        const filtrados = viajes.filter((viaje) => !viajesEliminados.includes(viaje.id));
        setViajesFiltrados(filtrados);
        console.log("se ejecuta viajes filtrados")
    
      }, [viajesEliminados, viajes]);


    return(
        <>
        <h2>Mis viajes como pasajero:</h2>
    <div className = "tablero-row">
                    {viajesFiltrados.map((turno, index)=> (
                    <div className="column" key={turno.id}>
                    <CardViajePasajero  handleClick= {handleClickbajarme} id_viaje= {turno.id} id_viaje_pasajero={id_viajespasajero[index]} origen={turno.origen} destino={turno.destino} fecha_string={turno.horario_salida} cupos_disponibles={turno.vacantes_disponibles} estado = {turno.estado} />
                    </div>
                    ))}
                  </div >
                  
        </>
    )
}