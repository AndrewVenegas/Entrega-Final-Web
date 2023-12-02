import React from 'react';
import {useNavigate} from "react-router-dom";

export default function TarjetaNotificacion(props) {

    const navigate = useNavigate();

    const handleClickViaje = (id) => {
        navigate(`/viajes/${id}`);
    }

    return (
        <div className="notificacion" style={{ textAlign: "left" }}>
            <div class="card">
                <div class="card-header">{props.header}</div>
                <div class="card-body">
                    <h5 class="card-title">{props.titulo}</h5>
                    <p class="card-text">{props.contenido}</p>
                    {props.header === "Cambios en tu viaje" ? (
                        <a className="btn btn-primary" onClick={() => handleClickViaje(props.id_viaje)}>Ver viaje</a>
                    ) : null}
                    {props.header === "Cambio en tu perfil" ? (
                        <a href="/perfil" className="btn btn-primary">Ver mi perfil</a>
                    ) : null}
                </div>
            </div>
        </div>
    )
}