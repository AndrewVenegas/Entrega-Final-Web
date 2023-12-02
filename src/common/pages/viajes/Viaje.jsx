import { AuthContext } from "../../../auth/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import './Viaje.css';
import API_URL from "../../config";
import { ConstructionOutlined } from "@mui/icons-material";

export default function Viaje() {

    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = parseInt(tokenPayload.sub, 10); // Convierte userId a entero

    const { isPasajero } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // id del viaje
    const [msg, setMsg] = useState();
    const [viajeEscogido, setViajeEscogido] = useState();
    const [fechaSalidaLegible, setFechaSalidaLegible] = useState("");
    const [fechaLlegadaLegible, setFechaLlegadaLegible] = useState("");
    const [ableInscribir, setAbleInscribir] = useState(true);
    
    const [pasajeroRechazado, setPasajeroRechazado] = useState(false);
    const [pasajeroInscrito, setPasajeroInscrito] = useState(false);
    const [eresChofer, setEresChofer] = useState(false);
    const [showChat, setShowChat] = useState(false);


    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const config_get_viajes_del_pasajero = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const config_get_solicitudes_del_viaje = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    

    useEffect(() => {
        axios.get(`${API_URL}/viajes/${id}`, config)
        .then( (response) => {
            if (response.data) {
                setViajeEscogido(response.data);
                const fecha_salida = new Date(response.data.horario_salida);
                const fecha_llegada = new Date(response.data.horario_llegada);
                const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                setFechaSalidaLegible(fecha_salida.toLocaleDateString('es-ES', opciones));
                setFechaLlegadaLegible(fecha_llegada.toLocaleDateString('es-ES', opciones));
                if (response.data.vacantes_disponibles == 0) 
                {setAbleInscribir(false)}
                if (response.data.id_conductor === userId) {
                    setEresChofer(true);
                    console.log("eres chofer")
                } else {
                    setEresChofer(false);
                    console.log("no eres chofer")
                }
            }
        } ).catch((error) => {
            console.log(error.data);
            setMsg("Debes ser pasajero para ver turnos")
            console.log(error);
        }
        )
        
        axios.get(`${API_URL}/viajes-pasajero/user/${userId}`, config_get_viajes_del_pasajero)
        .then( (response) => {
            if (response.data) {
                const viajes_pasajero = response.data;
                console.log(`Los viajes del pasajero son: `, viajes_pasajero)
                viajes_pasajero.forEach((viaje_pasajero) => {
                    if (viaje_pasajero.id_viaje == id) {
                        setPasajeroInscrito(true);
                        console.log("Estás inscrito a este viaje")
                    } else {
                        console.log("No estás inscrito a este viaje")
                        setPasajeroInscrito(false);
                    }
                });
            }
        }).catch((error) => {
            console.log(error.data);
            // setMsg("Debes ser pasajero para ver turnos")
            console.log(error);
        })
        

        axios.get(`${API_URL}/solicitudes/viaje/${id}`, config_get_solicitudes_del_viaje)
        .then( (response) => {
            if (response.data) {
                const solicitudes = response.data;
                console.log(`Las solicitudes del viaje son: `, solicitudes)
                solicitudes.forEach((solicitud) => {
                    if (solicitud.id_pasajero == userId && solicitud.estado == "Rechazado") {
                        setPasajeroRechazado(true);
                        console.log("Estás rechazado a este viaje")
                    } else {
                        console.log("No estás rechazado a este viaje")
                        setPasajeroRechazado(false);
                    }
                });
            }
        }).catch((error) => {
            console.log(error.data);
            // setMsg("Debes ser pasajero para ver turnos")
            console.log(error);
        })
        

    }, []);



    const handleClickVolver = () => {
        navigate(`/pagina-principal-pasajero`);
    }

    const handleSolicitudes = () => {
        navigate(`/viajes/${id}/solicitudes`);
    }

    const handleInscribir = () => {
        navigate(`/viajes/${id}/solicitudes/create`);
        
    }

    const handleactualizarestado = () => {
        navigate(`/viajes/${id}/update`);
        
    }

    const handleClickChat = () => {
        setShowChat(true);
        console.log("MOSTRANDO CHAT")
        navigate(`/viajes/${id}/chat`);
    }

    return (
        <div>
            {viajeEscogido && (
            <div>
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        <div class="card p-3 py-4">
                            <div class="text-center">
                                <div className="card-avatar mx-auto"></div>
                            </div>
                            <div class="text-center mt-3">
                                <h5 class="mt-2 mb-0">Viaje a {viajeEscogido.destino}</h5>
                                <div class="px-4 mt-1">
                                    <p class="fonts">Desde {viajeEscogido.origen} </p>
                                    <p class="fonts">Cupos disponibles: {viajeEscogido.vacantes_disponibles} </p>
                                    <p class="fonts">Hora de salida: {fechaSalidaLegible} </p>
                                    <p class="fonts">Hora de llegada: {fechaLlegadaLegible} </p>
                                    <p class="fonts">Estado: {viajeEscogido.estado} </p>
                                            {pasajeroInscrito && <p class="fonts">
                                                <strong>¡Te encuentras inscrito!</strong>
                                                                </p>}
                                                                {pasajeroRechazado && <p class="fonts">
                                                <strong>Lo sentimos, no te han aceptado.</strong>
                                                                </p>}
                                                                {eresChofer && <p class="fonts">
                                                <strong>¡Eres el Chofer de este viaje!</strong>
                                                                </p>}

                                </div>
                                <div class="buttons" >
                                {!isPasajero && !pasajeroInscrito && !pasajeroRechazado &&  !eresChofer &&
                                    <button  class="btn btn-outline-primary px-4" disabled= {!ableInscribir} onClick={ handleInscribir} >Inscribirme</button>
                                }

                                {(eresChofer || pasajeroInscrito) && <button  class="btn btn-outline-primary px-4" onClick={ handleClickChat} >Ver Chat</button>}

                                {isPasajero && (
                                            <>
                                                <button
                                                    className="btn btn-outline-primary px-4 mx-2" // Agrega la clase mx-2
                                                    onClick={handleSolicitudes}
                                                >
                                                    Manejar solicitudes
                                                </button>

                                                <button
                                                    className="btn btn-outline-primary px-4 mx-2" // Agrega la clase mx-2
                                                    onClick={handleactualizarestado}
                                                >
                                                    Actualizar
                                                </button>
                                            </>
                                        )}
                                
                                </div>
                                {msg &&  <h5 className="errormsj">{msg}</h5>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={ handleClickVolver } className="btn btn-dark" style={{ marginTop: '10px' , marginLeft: '10px'}}>
                Volver
            </button> 
            </div>
            )}
        </div>
    )
}