import {useNavigate} from "react-router-dom"
import './CardViajesPasajero.css'
import axios from "axios";
import React, {useContext, useState, useEffect} from "react";
import API_URL from "../../../config";
import { AuthContext } from "../../../../auth/AuthContext";

export default function CardViajePasajero({ handleClick, id_viaje, id_viaje_pasajero, origen, destino, fecha_string, cupos_disponibles, estado}){

    const fecha = new Date(fecha_string);
    const navigate = useNavigate();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const fechaLegible = fecha.toLocaleDateString('es-ES', opciones);
    const { token } = useContext(AuthContext);





    

return(
    <div className = "turno_busqueda">
        <div className= "turno_busqueda-container" > 
            <p> Destino:  {destino}</p>
            <p> Origen:  {origen}</p>
            <p> Fecha: {fechaLegible}</p>
            <p> Cupos disponibles:  {cupos_disponibles}</p>
            <p> Estado:  {estado}</p>

            <button className="learn-more">
                
                {estado=="En espera" && <span className="button" onClick={() => handleClick(id_viaje_pasajero, id_viaje, )}>Bajarme</span>}
                
        </button>

        </div>


    </div>
)

}