import { useState } from 'react'
import './CreateSolicitud.css'
import { AuthContext } from '../../../../auth/AuthContext';
import { useParams } from 'react-router';
import { useContext } from 'react';
import axios from 'axios';
import API_URL from '../../../config';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SolicitudShow from '../SolicitudShow';

export default function CreateSolicitud(){
    const [solicitudenviada, setSolicitudenviada] = useState(false);
    const [inputComentario, setInputComentario] = useState("");
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;
    const { id } = useParams();
    const [boolsolicitudactiva, setboolsolicitudactiva] = useState(false);
    const [solicitudactiva, setSolicitudactiva] = useState([]);
    const [solicitudshow, setSolicitudshow] = useState(false);
    const [fechaLegible, setFechalegible] = useState();

    const config_get_viaje = {
        'method': 'get',
        'url': `${API_URL}/viajes/${id}`,
        'headers': {
            'Authorization': `Bearer ${token}`
            }
      };


    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };


    useEffect (()=> {axios.get(`${API_URL}/solicitudes/user/${userId}/viaje/${id}`, config)
        .then( (response) => {
            if (response.data) {
                setSolicitudactiva(response.data);
                console.log("response.data en soli", response.data);

                console.log("solicitud", solicitudactiva);
                setboolsolicitudactiva(true);
                console.log("solicitud activa?", boolsolicitudactiva)
                setMsg("Ya tienes una solicitud para este viaje")
                console.log("mensaje", msg)

            }
        } ).catch((error) => {
            if (error.message!== "Request failed with status code 404"){
                setMsg("Hubo un error al obtener las solicitudes asociadas")
            }
            setboolsolicitudactiva(false);
            
        }
        )

    }, []);

    const handleclickgetsolicitud =() =>{
        setSolicitudshow(true);
    }
    
    
    

    const handleClickPostSolicitud = async (event) => {
        event.preventDefault();

        const infosolicitud = {    
            id_pasajero: userId, 
            comentario: inputComentario,
            id_viaje: id,
          };
        console.log("id usuario:", userId)
        
        console.log("id del viaje",id)
        console.log("COMENTARIO",inputComentario)


        try {
            const response = await axios.post(`${API_URL}/solicitudes`, 
            infosolicitud, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },}
            );
            console.log("respuesta del post", response);
            setMsg(`Solicitud enviada`);
            setSolicitudenviada(true);

            axios(config_get_viaje)
            .then((response) => {
              console.log(response.data)
              console.log("get de viaje correcto")
              const id_chofer = response.data.id_conductor

            const config_post_notifiacion = {
                'method': 'post',
                'url': `${API_URL}/notificaciones`,
                'headers': {
                    'Authorization': `Bearer ${token}`
                    },
                'data': 
                    {
                        'tipo': 'chofer',
                        'contenido': 'Un pasajero desea inscribirse en tu viaje. Revísalo para poder aceptarlo.',
                        'id_pasajero': id_chofer,
                        'header': 'Cambios en tu viaje',
                        'id_viaje': id,
                        'titulo': 'Nueva solicitud en tu viaje',
                    },
                }

            axios(config_post_notifiacion)
            . then( (response) => {
                console.log("Se ha creado la notificacoin de aviso solicitud viaje")
                console.log(response)
            }). catch( (error) => {
                console.log("Ha ocurrido un error al crear la notificacion de solicitud de viaje")
                console.log(error)
            })

        }). catch( (error) => {
            console.log("Ha ocurrido un error en el get de viaje")
            console.log(error)
        })
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al crear la solicitud.");
        }}

    return (
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            {!solicitudshow &&<div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
              <form>  
                   {!solicitudenviada && !boolsolicitudactiva &&  
                <div>
                    {msg}
                    <h3 className="text-center">Solicitud</h3>
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
                        <button className="btn btn-outline-primary px-4" onClick={handleClickPostSolicitud}>Enviar</button>
                    </div>
                    </div>
                </div>
                }

                <div> 
                    {msg && boolsolicitudactiva && <h2 className="errormsj">{msg}</h2>}
                    {msg && solicitudenviada &&
                    <div> 
                        <h3 className="text-center">{msg}</h3>
                        <div className="mb-2">
                            Comentario: {inputComentario}
                        </div>
                    </div>
                    }
                </div>
                <div></div>
                {boolsolicitudactiva &&  <div class="buttons">
                <button  className="btn btn-outline-primary px-4 mb-2" onClick={handleclickgetsolicitud}>Ver solicitud</button> </div>}


                <div class="buttons">
                <Link to="/pagina-principal-pasajero"  className="btn btn-outline-primary px-4" style={{marginTop:"10px"}}>Volver</Link> 
                </div>
             
            </form>
            
            
            </div>}
                            
            {solicitudshow && 
            <div className='d-flex justify-content-center align-items-center vh-100'> <SolicitudShow
            id_viaje={solicitudactiva.id_viaje} 
            estado={solicitudactiva.estado} 
            comentario={solicitudactiva.comentario}
            createdat={solicitudactiva.createdAt}
            >
            </SolicitudShow>
            <button className="btn btn-outline-primary px-4" onClick={() => setSolicitudshow(false)} style={{marginLeft:"10px"}}>Volver</button>
            </div>
          
            }
        </div>
    )

}