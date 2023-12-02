import React, { useState , useContext, useEffect} from "react";
import './solicitud-page.css';
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath , useNavigate} from "react-router-dom"
import API_URL from "../../config";

export default function PageSolicitudChofer() {
    const [inputRut, setInputRut] = useState("");
    const [solicitudenviada, setSolicitudenviada] = useState(false);
    const [inputComentario, setInputComentario] = useState("");
    const [msg, setMsg] = useState("");
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;


    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;

    const validateRut = (rut) => {
        return rutRegex.test(rut);
      };
      


    const handleClickPost = async (event) => {
        event.preventDefault();

        if (!validateRut(inputRut)) {
            setMsg("Por favor, ingrese un RUT válido (con puntos y guion).");
            return;
          }
        
        const infosolicitudchofer = {    
            id_pasajero: userId, 
            rut: inputRut,
            comentario: inputComentario
          };
        try {
            const response = await axios.post(`${API_URL}/solicitud_chofer`, 
            infosolicitudchofer, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },}
            );
            console.log(response);
            setMsg(`Solicitud enviada`);
            setSolicitudenviada(true);
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al crear la solicitud.");
        }}
    
    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
             <form onSubmit={handleClickPost}>  
                   {!solicitudenviada &&        
                <div>
                    <h3 className="text-center">Solicitud Chofer</h3>
                    <div className="mb-2">
                        <label htmlFor = "rut">Rut</label>
                        <input 
                        type= 'rut' 
                        className= "form-control"
                        value={inputRut}
                        onChange={(event) => setInputRut(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "comentario">Comentario</label>
                        <input 
                        type= 'comentario' 
                        className="form-control"
                        value={inputComentario}
                        onChange={(event) => setInputComentario(event.target.value)}
                        required/>
                    </div>
                    
                    <div className="d-grid">
                    <div class="buttons">
                        <button className="btn btn-outline-primary px-4">Enviar</button>
                    </div>
                    </div>
                </div>
                }

                <div> 
                    {msg && !solicitudenviada && <h2 className="errormsj">{msg}</h2>}
                    {msg && solicitudenviada && 
                    <div> 
                        <h3 className="text-center">{msg}</h3>
                        <div className="mb-2">
                            Rut: {inputRut}
                        </div>
                        <div className="mb-2">
                            Comentario: {inputComentario}
                        </div>
                    </div>
                    }
                </div>
                <div></div>

                <button onClick={() => navigate("/perfil")} className="btn btn-outline-primary" style={{ marginTop: '10px'}}>
                    Volver a mi perfil
                </button>
             
            </form>
            </div>
        </div>
    )
}