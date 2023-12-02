import './VehiclePage.css';
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import API_URL from '../../../config';


export default function VehiclePage() {

    const { token } = useContext(AuthContext);
    const {isPasajero} = useContext(AuthContext); 
    const { id } = useParams();
    const navigate = useNavigate();

    const [auto, setAuto] = useState({});

    if (!isPasajero) {
        return (
            <div>Solo los choferes tienen autos</div>
        )
    } else {
        
        useEffect(() => {
            axios.get(`${API_URL}/vehiculos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.data) {
                    setAuto(response.data);
                }
            }) .catch((error) => {
            console.log(error);
            console.log("error con el get del auto")
        });
    },[]);

    const handleClickVolver = () => {
        navigate("/mis-autos");
    }

    const handleClickEditar = (id) => {
        navigate(`/editar-auto/${id}`);
    }

        return (
        <div>
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        <div class="card p-3 py-4">
                            <div class="text-center">
                                <div className="card-avatar mx-auto"></div>
                            </div>
                            <div class="text-center mt-3">
                                <h5 class="mt-2 mb-0">{auto.nombre}</h5>
                                <span>{auto.patente}</span>
                                <div class="px-4 mt-1">
                                    <p class="fonts">Capacidad: {auto.capacidad} </p>
                                    <p class="fonts">Papeles al día: Sí </p>
                                </div>
                                <div class="buttons">
                                    <button class="btn btn-outline-primary px-4" onClick={() => handleClickEditar(id)}>Editar</button>
                                    {/* <button class="btn btn-primary px-4 ms-3">Eliminar</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleClickVolver} className="btn btn-dark" style={{ marginTop: '10px' , marginLeft: '10px'}}>
                Volver
            </button>
        </div>
        )
    }
}