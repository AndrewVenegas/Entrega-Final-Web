import './CreateNewViaje.css';

import 'react-datepicker/dist/react-datepicker.css'
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import axios from "axios";
import API_URL from '../../../../config';
import COLORES from '../../../../colores';

import './CreateNewVehiculo.css';



export default function CreateNewVehiculo() {

    const { token } = useContext(AuthContext);

    const [inputName, setInputName] = useState("");
    const [inputPatente, setInputPatente] = useState("");
    const [inputCapacidad, setInputCapacidad] = useState("");
    const [inputModelo, setInputModelo] = useState("");
    const [inputMarca, setInputMarca] = useState("");
    const [inputAno, setInputAno] = useState("");
    const [inputColor, setInputColor] = useState("");
    const [msg, setMsg] = useState("");
    const [vehicleCreated, setVehicleCreated] = useState(false);

    const [choferes, setChoferes] = useState([""]);
    const [chofer, setChofer] = useState("");
    const [choferElegido, setChoferElegido] = useState("");
    const [primerPasajero, setPrimerPasajero] = useState(null);

    const opcionesColores = COLORES;

    const navigate = useNavigate();

    const config_pasajeros = {
        'method': 'get',
        'url': `${API_URL}/pasajeros`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };


    useEffect(() => {
        // Llamar a handleClickGetCategory solo una vez al crear el componente
        handleClickGetChoferes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickGetChoferes = async () => {
        try {
            const response = await axios(config_pasajeros);
            const pasajeros = response.data;
            const choferes_list = pasajeros.filter((pasajero) => pasajero.es_conductor);
            
            if (choferes_list.length > 0) {
                setPrimerPasajero(choferes_list[0]);
                setChoferes(choferes_list);
                setChofer(choferes_list[0].id);
                setChoferElegido(choferes_list[0].id);
                console.log("Parametros del primer componente:")
                console.log(choferes)
                console.log(primerPasajero)
                console.log(chofer)
            } else {
                // No hay conductores, así que actualizamos el estado para mostrar el mensaje
                setChoferes(""); // Limpiamos la lista de choferes
                setPrimerPasajero(null); // Limpiamos el primer pasajero
                setChofer(""); // Limpiamos el chofer seleccionado
    
                // Mostrar un mensaje indicando que no hay conductores disponibles
                console.log("No hay conductores disponibles");
            }
        } catch (error) {
            console.error("Hubo un error al obtener los pasajeros:", error);
            // Manejar el error si es necesario
        }
    };


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
            id_conductor: choferElegido
        };

        let response = '';
        try {
            const response = await axios.post(`${API_URL}/vehiculos`, newVehicle, {
                headers: {
                    authorization: `Bearer ${token}`
                }});
            console.log(response)
            setMsg(`Auto ${inputName} agregado correctamente.`);
            setVehicleCreated(true);
            
        } catch(error){
            console.log(response)
            console.log(error);
            console.log('hubo un error');
            setMsg("Hubo un error al agregar el auto.");
            setVehicleCreated(false);
        }}
    

        const handleClickGoBack = () => {
            navigate("/admin/vehiculos")
        }

    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <form onSubmit={handleClickAdd}>
                {!vehicleCreated &&                 
                <div>
                    <h3 className="text-center">Crear auto</h3>

                    <div className="mb-2">
                        <label htmlFor="chofer">Selecciona un Chofer</label>
                        <select name="chofer" onChange={(event) => setChoferElegido(event.target.value)}>
                            {choferes !== "" && choferes !== undefined ? (
                                choferes.map((chofer) => (
                                    <option key={chofer.id} value={chofer.id}>
                                        {chofer.nombre}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No hay choferes disponibles
                                </option>

                            )}
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor = "nombre">Nombre/Alias</label>
                        <input 
                        type= 'nombre' 
                        className="form-control"
                        value={inputName}
                        onChange={(event) => setInputName(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "email">Patente</label>
                        <input 
                        type= 'nombre' 
                        className="form-control"
                        value={inputPatente}
                        onChange={(event) => setInputPatente(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "nombre">Modelo</label>
                        <input 
                        type= 'nombre'
                        className="form-control"
                        value={inputModelo}
                        onChange={(event) => setInputModelo(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "nombre">Marca</label>
                        <input 
                        type= 'nombre'
                        className="form-control"
                        value={inputMarca}
                        onChange={(event) => setInputMarca(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "telefono">Año</label>
                        <input 
                        type= 'number'
                        className="form-control"
                        value={inputAno}
                        onChange={(event) => setInputAno(event.target.value)}
                        required/>
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
                        <label htmlFor = "telefono">Capacidad</label>
                        <input 
                        type= 'number' 
                        className="form-control"
                        value={inputCapacidad}
                        onChange={(event) => setInputCapacidad(event.target.value)}
                        required/>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Agregar</button>
                    </div>
                </div>}
                <div>
                    {msg && <h2 className="errormsj">{msg}</h2>}
                </div>

                <div></div>
            </form>
                 <button className="btn btn-outline-secondary" style={{ marginTop: '10px' }} onClick={() => handleClickGoBack()}>Volver</button>
            </div>
        </div>
    )
}