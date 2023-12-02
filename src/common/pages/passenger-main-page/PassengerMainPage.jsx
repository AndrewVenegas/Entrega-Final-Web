import './PassengerMainPage.css';
import { AuthContext } from "../../../auth/AuthContext";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import React, {useContext, useState, useEffect} from "react";
import Search from "./Search";
import TurnoBusqueda from "./TurnoBusqueda";
import API_URL from '../../config';


export default function PassengerMainPage() {
  const [viajes, setViajes] = useState([])
  const [show, setShow] = useState("")
  const [msg, setMsg] = useState("")
  const { token } = useContext(AuthContext);
  const {isPasajero, setIsPasajero} = useContext(AuthContext);
  const navigate = useNavigate();

  const aplicarFiltro = ({ origen, destino}) => {
      const turnosFiltrados = turnos.filter((turno) => {
      const origenCumple = origen === '' || turno.origen.toLowerCase().includes(origen.toLowerCase());
      const destinoCumple = destino === '' || turno.destino.toLowerCase().includes(destino.toLowerCase());
      return  origenCumple  && destinoCumple;
    });
    // Actualiza el estado de los turnos filtrados
    setTurnosFiltrados(turnosFiltrados);
  };

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

  useEffect(() => {
      setShow(false)
      axios.get(`${API_URL}/viajes`, config)
      .then( (response) => {
          if (response.data) {
            setShow(true)
            const viajesEnEspera = response.data.filter(viaje => viaje.estado === "En espera");
            setViajes(viajesEnEspera);
            console.log("response.data:");
            console.log(response.data);
            console.log("viajes:");
            console.log(viajes);
            console.log("tuve respuesta del get viajes")
          }
      } ).catch((error) => {
          setMsg("Debes ser pasajer para ver los viajes")
          console.log(error);
      })
  }, []);


    return (<>
    <div className="tablero">
      <Search /> 
    </div>         
    <div className = "tablero">
      {show && (
                    <div className = "tablero-row">
                    {viajes.map(turno=> (
                    <div className="column" key={turno.id}>
                    <TurnoBusqueda id={turno.id} origen={turno.origen} destino={turno.destino} fecha_string={turno.horario_salida} cupos_disponibles={turno.vacantes_disponibles} />
                    </div>
                    ))}
                  </div >
      )}

    </div>
    </>
      
    )
  }