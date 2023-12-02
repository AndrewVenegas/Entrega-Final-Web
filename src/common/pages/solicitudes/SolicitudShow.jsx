import React from 'react';

export default function SolicitudShow(props) {
    
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    

    return (
        <div className="solicitud" style={{ textAlign: "left" }}>
            <div class="card">
                <div class="card-header">Solicitud</div>
                <div class="card-body">
                    <p class="card-text">Estado: {props.estado}</p>
                    <p class="card-text">Comentario: {props.comentario}</p>
                    <p class="card-text">Fecha creación: {props.createdat}</p>
                </div>
            </div>
        </div>
    )
}