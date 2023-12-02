import API_URL from "../../../config";
import { AuthContext } from "../../../../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { dividerClasses } from "@mui/material";
import TurnoBusqueda from "../../passenger-main-page/TurnoBusqueda";


export default function MisViajesChofer() {
    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const navigate = useNavigate();
    const [chofer, setChofer] = useState();
    const [msg, setMsg] = useState();
    const [viajes, setViajes] = useState([]);
    
    console.log("id_usuario:", userId)

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/viajes/conductor/${userId}`, config)
        .then( (response) => {
            if (response.data) {
                setViajes(response.data)
                
            }
            console.log(viajes)
        } ).catch((error) => {
            setChofer(false)
            navigate("/solicitud-chofer")
            console.log(error);
        })
    }, []);


    return(
        <>
        <h2>Mis viajes creados: </h2>
    <div className = "tablero-row">
                    {viajes.map(turno=> (
                    <div className="column" key={turno.id}>
                    <TurnoBusqueda id={turno.id} origen={turno.origen} destino={turno.destino} fecha_string={turno.horario_salida} cupos_disponibles={turno.vacantes_disponibles} />
                    </div>
                    ))}
                  </div >
                  
                  </>
    )
}