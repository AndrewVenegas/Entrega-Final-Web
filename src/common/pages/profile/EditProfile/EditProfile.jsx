import React, { useState , useContext, useEffect} from "react";
import './EditProfile.css';
import axios from "axios";
import { AuthContext } from "../../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath , useNavigate} from "react-router-dom"
import API_URL from "../../../config";

export default function EditProfile() {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputTelefono, setInputTelefono] = useState("");
    const [inputContrasena, setInputContrasena] = useState("");
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userActualizado, setUserActualizado] = useState(false);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;


    useEffect(() => {
        // Decodificar el token para obtener el ID del usuario
      
        // Realizar la solicitud HTTP para obtener la información del pasajero
        axios.get(`${API_URL}/pasajeros/${userId}`)
          .then((response) => {
            // Verificar si el componente aún está montado antes de actualizar el estado
            if (response.data) {
                setInputName(response.data.nombre);
                setInputEmail(response.data.email);
                setInputTelefono(response.data.telefono);


            }
          })
          .catch((error) => {
            console.log(error);
          });
      
        // No es necesario devolver una función de limpieza vacía aquí
      }, []);


    const handleClickPut = async (event) => {
        event.preventDefault();
        
        const infoPasajero = {    
            nombre: inputName, 
            email: inputEmail, 
            telefono: parseInt(inputTelefono), 
            contrasena: inputContrasena
          };
        try {
            const response = await axios.put(`${API_URL}/pasajeros/${userId}`, 
            infoPasajero
            );
            console.log(response);
            setMsg(`Usuario ${inputName} actualizado.`);
            console.log("usuario actualizado:", userActualizado)
            setUserActualizado(true);
            console.log("usuario actualizado:", userActualizado)
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al actualizar el usuario.");
        }}
    
    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
             <form onSubmit={handleClickPut}>  
             {!userActualizado &&              
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
                        <label htmlFor = "telefono">Teléfono</label>
                        <input 
                        type= 'telefono' 
                        className="form-control"
                        value={inputTelefono}
                        onChange={(event) => setInputTelefono(event.target.value)}
                        required/>
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
                    {msg && <h2 className="errormsj">{msg}</h2>}
                </div>
                <div></div>
                {userActualizado && <div class="buttons">
                <Link to="/perfil"  className="btn btn-outline-primary px-4">Ver perfil</Link> </div>}
                <button className="btn btn-outline-secondary px-4" onClick={() => navigate("/perfil")} style={{marginTop: "10px"}}>Volver</button>
                
             
            </form>
            </div>
        </div>
    )
}