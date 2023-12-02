import React, { useState , useContext, useEffect} from "react";
import './EditProfileAdmin.css';
import axios from "axios";
import { AuthContext } from "../../../../../auth/AuthContext.jsx";
import { Link, useMatch, useResolvedPath , useNavigate} from "react-router-dom"
import API_URL from "../../../../config.js";

export default function EditProfile() {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputContrasena, setInputContrasena] = useState("");
    const [inputImagen, setInputImagen] = useState("");
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [adminActualizado, setAdminActualizado] = useState(false);
    // Luego, en el useEffect, decodificamos el token y obtenemos el ID del usuario
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const adminId = tokenPayload.sub;
    const [error, setError] = useState(false);


    useEffect(() => {
        // Decodificar el token para obtener el ID del usuario
        const config_get = {
            'method': 'get',
            'url': `${API_URL}/admin/${adminId}`,
            'headers': {
                'Authorization': `Bearer ${token}`
            }
          };
        // Realizar la solicitud HTTP para obtener la información del pasajero
        axios(config_get)
          .then((response) => {
            // Verificar si el componente aún está montado antes de actualizar el estado
            if (response.data) {
                setInputName(response.data.nombre);
                setInputEmail(response.data.email);

            }
          })
          .catch((error) => {
            console.log(error);
          });
      
        // No es necesario devolver una función de limpieza vacía aquí
      }, []);


    const handleClickPut = async (event) => {
        event.preventDefault();
        const config_put = {
            method: 'put',
            url: `${API_URL}/admin/${adminId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              nombre: inputName,
              email: inputEmail,
              contrasena: inputContrasena,
            },
          };
        try {
            const response = await axios(config_put);
            console.log(response);
            setMsg(`Usuario ${inputName} actualizado.`);
            setAdminActualizado(true);
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')

            setMsg("Hubo un error al actualizar el usuario.");
            setMsg(error.response.data.message);
        }}
    
    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
             <form onSubmit={handleClickPut}>  
             {!adminActualizado &&              
                <div>
                    <h3 className="text-center">Editar perfil</h3>
                    <div className="mb-2">
                        <label htmlFor = "nombre">Nombre</label>
                        <input 
                        type= 'nombre' 
                        className="form-control"
                        value={inputName}
                        onChange={(event) => setInputName(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "email">Email</label>
                        <input 
                        type= 'email' 
                        className="form-control"
                        value={inputEmail}
                        onChange={(event) => setInputEmail(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "imagen">Imagen</label>
                        <input 
                        type= 'imagen' 
                        className="form-control"
                        value={inputImagen}
                        onChange={(event) => setInputImagen(event.target.value)}
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor = "password">Contraseña</label>
                        <input 
                        type= 'password'
                        className="form-control"
                        value={inputContrasena}
                        onChange={(event) => setInputContrasena(event.target.value)}
                        required/>
                    </div>
                    <div className="d-grid">
                    <div class="buttons">
                        <button className="btn btn-outline-primary px-4">Actualizar datos</button>
                    </div>
                    </div>
                </div>}

                <div> 
                    {msg && <p className="text-danger">{msg}</p>}
                </div>
                <div></div>
                {adminActualizado && <div class="buttons">
                <Link to="/perfilAdmin"  className="btn btn-outline-primary px-4">Ver perfil</Link> </div>}
                
             
            </form>
            </div>
        </div>
    )
}