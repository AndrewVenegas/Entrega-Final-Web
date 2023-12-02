import React, { useState , useContext, useEffect} from "react";
import './EditViaje.css';
import axios from "axios";
import { AuthContext } from "../../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath , useNavigate, useParams} from "react-router-dom"
import API_URL from "../../../config";

export default function EditViaje() {
    const [inputEstado, setInputEstado] = useState("En espera");
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [estadoActualizado, setEstadoActualizado] = useState(false);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const { id } = useParams();


    const handleClickPut = async (event) => {
        event.preventDefault();
        const config_put = {
            'method': 'put',
            'url': `${API_URL}/viajes/${id}`,
            'headers': {
              'Authorization': `Bearer ${token}`
            },
            'data': {
                'estado': inputEstado
            },
          };

        const config_get_pasajeros = {
            'method': 'get',
            'url': `${API_URL}/viajes-pasajero/viaje/${id}`,
            'headers': {
                'Authorization': `Bearer ${token}`
                },
            }

        
        try {
            const response = await axios(config_put);
            console.log(response);
            setMsg(`Viaje actualizado`);
            setEstadoActualizado(true);

            axios(config_get_pasajeros)
            .then( (response) => {
                const pasajeros = response.data;
                console.log("Pasajeros del viaje:", pasajeros.data)
                for (const pasajero of pasajeros) {
                    console.log(pasajero)
                    const idPasajero = pasajero.id_pasajero;
                    const config_post_notifiacion = {
                        'method': 'post',
                        'url': `${API_URL}/notificaciones`,
                        'headers': {
                            'Authorization': `Bearer ${token}`
                            },
                        'data': 
                            {
                                'tipo': 'pasajero',
                                'contenido': 'Los detalles del viaje en el que estás inscrito han cambiado. Revísalo para más información.',
                                'id_pasajero': idPasajero,
                                'header': 'Cambios en tu viaje',
                                'id_viaje': id,
                                'titulo': 'Se han realizado cambios en tu viaje',
                            },
                        }
                    axios(config_post_notifiacion)
                    .then( (response) => {
                        console.log("Notificacion creada para el pasajero de id:", idPasajero)
                        console.log(response)
                    }). catch( (error) => {
                        console.log("Hubo un error al crear la notificación de edición de viaje")
                        console.log(error)
                    })
                }

            }). catch( (error) => {
                console.log("Hubo un error obteniendo los pasajeros del viaje")
                console.log(error)
            })

            

            // axios(congif_post_notifiacion)
            //     .then((response) => {
            //       console.log(response)
            //       console.log("notificacion creada en el back")
            //     }). catch((error) => {
            //       console.error('Hubo un error al crear la notificación de rechazo de solicitud', error)
            //     })
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al actualizar el viaje.");
        }}
    
    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
             <form onSubmit={handleClickPut}>  
             {!estadoActualizado &&              
                <div>
                    <h3 className="text-center">Editar Viaje</h3>
                    
                    <div className="mb-2">
                        <label htmlFor = "estado" style={{ marginRight: '10px' }}> Estado</label>

                        <select name="vehiculo" onChange={(event) => setInputEstado(event.target.value)}>
                            
                        <option key="1" value="En espera"> En espera </option>
                        <option key="2" value="Terminado"> Terminado </option>
                        <option key="3" value="Cancelado"> Cancelado </option>
                        
                        </select>
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
                {estadoActualizado && <div class="buttons">
                <Link to="/viajes-chofer"  className="btn btn-outline-primary px-4">Volver</Link> </div>}
                
             
            </form>
            </div>
        </div>
    )
}