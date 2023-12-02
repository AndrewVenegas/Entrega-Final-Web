import { AuthContext } from "../../../../auth/AuthContext";
import {useNavigate} from "react-router-dom";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import './MyVehiclesPage.css';
import API_URL from "../../../config";

export default function MyVehiclesPage() {

    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const { isPasajero } = useContext(AuthContext);
    const [autos, setAutos] = useState([]);
    const navigate = useNavigate();
    const [chofer, setChofer] = useState();
    const [msg, setMsg] = useState();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/vehiculos/conductor/${userId}`, config)
        .then( (response) => {
            if (response.data) {
                setChofer(true)
                setAutos(response.data);
            }
        } ).catch((error) => {
            setChofer(false)
            setMsg("Debes ser chofer para tener autos. Si han aceptado tu solicitud, vuelve a iniciar sesión.")
            console.log(error);
        })
    }, []);

    const handleClickAgregar = () => {
        navigate("/nuevo-auto");
    }

    const handleClickVer = (id) => {
        navigate(`/vehiculo/${id}`);
    }

    return (
        <div>
            <p>{msg}</p>
            {chofer && (
                <div>
                    <h1>Mis vehículos:</h1>
                    <div className="tablero">
                        <div className="tablero-row">
                            {autos.map((elemento) => (
                                <div className="column" key={elemento.id}>
                                    <div className="card1" style={{ background: elemento.color }}>
                                        <div class="card-border-top1"></div>
                                        <div class="img1"></div>
                                        <span> {elemento.nombre} </span>
                                        <p class="patente"> {elemento.patente} </p>
                                        <button onClick={() => handleClickVer(elemento.id)}> Ver </button>
                                    </div>
                                    <br></br>
                                </div>
                            ))}
                            <div class="card1" style={{ background: "#3405a3" }}>
                            <div class="card-border-top1"></div>
                            <div class="img1"></div>
                            <span> Nuevo auto</span>
                            <p class="patente"> </p>
                            <button onClick={handleClickAgregar}> Agregar</button>
                    </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )

}