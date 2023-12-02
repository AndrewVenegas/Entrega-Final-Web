import React, { useState, useContext }  from "react";
import './LogInAdminPage.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext.jsx";
import API_URL from "../../config.js";



export default function AdminLogin() {
    // Recuperamos el token y la función set token desde el AuthContext gracias al padre de routing (AuthProvider en main.jsx)
    // Es decir, usamos el contexto AuthContext y que nos devuelva los valores del token
    const {token, setToken} = useContext(AuthContext);
    const {isLoged, setIsLoged} = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AuthContext);

    const [inputEmail, setInputEmail] = useState("");
    const [inputContrasena, setInputContrasena] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const navegate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("apretaste el form")

        const admin =         
        {
            email: inputEmail, 
            contrasena: inputContrasena
        }
        // Nos conectamos al endpoint para validar un login
        axios.post(`${API_URL}/login/admin`, admin)
        .then((response) => {
            // Uno entra aqui si no hay error
            console.log(response);
            
            setError(false);
            setMsg("Login Admin correcto");
            
            // Ahora recuperaremos el token y lo guardaremos en LocalStorage
            const access_token = response.data.access_token;
            setToken(access_token);
            setIsLoged(true);
            setIsAdmin(true);
            setError(false);
            // En vez de hacer esto, usamos el setToken gracias al AuthContext: localStorage.setItem('token', token);
            navegate("/CheckAdmin");
        }).catch((error) => {
            console.log("estoy en el catch")
            console.log(error.response)
            console.log(error.response.data.message)
            setMsg(error.response.data.message);
            setError(true);
        })
        console.log("fuera del then")
    };

    return (
        <div className="login teplate d-flex justify-content-center align-items-center vh-100 ">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            
                <form onSubmit={handleSubmit}>
                <h3 className="text-center">Iniciar Sesión Administrador</h3>
                <div className="mb-2">
                    <label htmlFor = "email">Email</label>
                    <input 
                    type= 'email' 
                    placeholder="Ingresa tu email" 
                    className="form-control"
                    value={inputEmail}
                    onChange={(event) => setInputEmail(event.target.value)}
                    required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor = "password">Contraseña</label>
                    <input 
                    type= 'password' 
                    placeholder="Ingresa tu contraseña" 
                    className="form-control"
                    value={inputContrasena}
                    onChange={(event) => setInputContrasena(event.target.value)}
                    required
                    />
                </div>
                <div>
                    {error && <p className="text-danger">{msg}</p>}
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary">Ingresar</button>
                </div>
                <p className="text-end mt-2">
                   <a href="/login" className = "ms-2 align-items-center">Ingresar como usuario</a>
                </p>

            </form>
            
            </div>

            
        </div>
    )
}