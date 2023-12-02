import React, { useState } from "react";
import './CreateNew.css';
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../../../config.js"; ""
import { useNavigate } from "react-router-dom";

export default function CreateNewPassenger() {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputTelefono, setInputTelefono] = useState("");
    const [inputContrasena, setInputContrasena] = useState("");
    const [inputEsConductor, setInputEsConductor] = useState("");
    const [msg, setMsg] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    const navigate = useNavigate();

    const handleClickPost = async (event) => {
        event.preventDefault();
        console.log(inputEsConductor==="true")
        console.log("el tipo es:")
        console.log(typeof inputEsConductor);
        if (inputEsConductor==="true") {
            setInputEsConductor(true);
        } else {
            setInputEsConductor(false);
        }
    
        const valorBooleano = JSON.parse(inputEsConductor);
        console.log(typeof valorBooleano);
        const nuevoPasajero = {
            nombre: inputName,
            email: inputEmail,
            telefono: parseInt(inputTelefono),
            contrasena: inputContrasena,
            es_conductor: valorBooleano
        };
        
        console.log("El nuevo pasajero es:")
        console.log(nuevoPasajero);
        let huboerror = false;
        let response = '';
        try {
            const response = await axios.post(`${API_URL}/pasajeros`,
                nuevoPasajero
            );
            console.log(response)
            setMsg(`Usuario ${inputName} creado correctamente.`);
            setUserCreated(true);

        } catch (error) {
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al crear el usuario.");
            setUserCreated(false);
        }
    }

    const handleClickGoBack = () => {
        navigate("/admin/pasajeros")
    }

    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <form onSubmit={handleClickPost}>
                    {!userCreated &&
                        <div>
                            <h3 className="text-center">Crear Pasajero</h3>
                            <div className="mb-2">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={inputName}
                                    onChange={(event) => setInputName(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type='email'
                                    className="form-control"
                                    value={inputEmail}
                                    onChange={(event) => setInputEmail(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type='telefono'
                                    className="form-control"
                                    value={inputTelefono}
                                    onChange={(event) => setInputTelefono(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type='password'
                                    className="form-control"
                                    value={inputContrasena}
                                    onChange={(event) => setInputContrasena(event.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="esConductor">¿Es conductor?</label>
                                <select
                                    className="form-control"
                                    value={inputEsConductor}
                                    onChange={(event) => setInputEsConductor(event.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary">Crear cuenta</button>
                            </div>
                        </div>}
                    <div>
                        {msg && <h2 className="errormsj">{msg}</h2>}
                    </div>
                    <div></div>

                    <button className="btn btn-outline-secondary" style={{ marginTop: '10px' }} onClick={() => handleClickGoBack()}>Volver</button>

                </form>
            </div>
        </div>
    )
}