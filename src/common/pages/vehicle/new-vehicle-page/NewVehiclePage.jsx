import { AuthContext } from "../../../../auth/AuthContext";
import './NewVehiclePage.css';
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../../../config";
import COLORES from "../../../colores";

export default function NewVehiclePage() {

    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const [inputName, setInputName] = useState("");
    const [inputPatente, setInputPatente] = useState("");
    const [inputCapacidad, setInputCapacidad] = useState("");
    const [inputModelo, setInputModelo] = useState("");
    const [inputMarca, setInputMarca] = useState("");
    const [inputAno, setInputAno] = useState("");
    const [inputColor, setInputColor] = useState("");
    const [msg, setMsg] = useState("");
    const [vehicleCreated, setVehicleCreated] = useState(false);
    
    const navigate = useNavigate();

    const opcionesColores = COLORES;

    const handleClickAdd = async (event) => {
        event.preventDefault();

        const newVehicle = {
            nombre: inputName,
            patente: inputPatente,
            capacidad: inputCapacidad,
            modelo: inputModelo,
            marca: inputMarca,
            ano: parseInt(inputAno),
            color: inputColor,
            papeles_al_dia: true,
            id_conductor: userId
        };

        let response = '';
        try {
            const response = await axios.post(`${API_URL}/vehiculos`, newVehicle, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            setMsg(`Auto ${inputName} agregado correctamente.`);
            setVehicleCreated(true);

        } catch (error) {
            console.log(response)
            console.log(error);
            console.log('hubo un error');
            setMsg("Hubo un error al agregar el auto.");
            setVehicleCreated(false);
        }
    }


    const handleClickVolver = () => {
        navigate("/mis-autos");
    }


    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <form onSubmit={handleClickAdd}>
                    {!vehicleCreated &&
                        <div>
                            <h3 className="text-center">Agregar auto</h3>
                            <div className="mb-2">
                                <label htmlFor="nombre">Nombre/Alias</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={inputName}
                                    onChange={(event) => setInputName(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Patente</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={inputPatente}
                                    onChange={(event) => setInputPatente(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nombre">Modelo</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={inputModelo}
                                    onChange={(event) => setInputModelo(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nombre">Marca</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={inputMarca}
                                    onChange={(event) => setInputMarca(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="color">Color</label>
                                <select
                                    className="form-select"
                                    value={inputColor}
                                    onChange={(event) => setInputColor(event.target.value)}
                                    required
                                >
                                    <option value="">Selecciona un color</option>
                                    {opcionesColores.map((color) => (
                                        <option key={color.valor} value={color.valor}>
                                            {color.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="telefono">Año</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    value={inputAno}
                                    onChange={(event) => setInputAno(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="telefono">Capacidad</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    value={inputCapacidad}
                                    onChange={(event) => setInputCapacidad(event.target.value)}
                                    required />
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary">Agregar</button>
                            </div>
                        </div>}
                    <div>
                        {msg && <h2 className="errormsj">{msg}</h2>}
                    </div>
                    <div></div>

                    {vehicleCreated && <Link to="/mis-autos" className="btn btn-primary">Ver mis autos</Link>}

                </form>
                <button onClick={handleClickVolver} className="btn btn-dark" style={{ marginTop: '10px' , marginLeft: '10px'}}>
                Volver
                </button>
            </div>
        </div>
    )
}