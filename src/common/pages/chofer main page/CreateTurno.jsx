import './CreateTurno.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState, useEffect, useContext } from "react";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { AuthContext } from "../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath , useNavigate} from "react-router-dom"
import axios from "axios";
registerLocale('es', es)
import API_URL from '../../config';
import { max } from 'date-fns';

export default function CreateTurno(){
    
    const [Inputvacantes_disponibles, setInputVacantes_disponibles] = useState("");
    const [Inputhorario_llegada, setInputHorario_llegada] = useState(new Date());
    const [Inputhorario_salida, setInputHorario_salida] = useState(new Date());
    const [Inputorigen, setInputOrigen] = useState("");
    const [Inputdestino, setInputDestino] = useState("");
    const [Inputtarifa, setInputTarifa] = useState("");
    const [vehiculos, setVehiculos] = useState([""]);
    const [vehiculo, setVehiculo] = useState("");
    const [viajeCreated, setViajeCreated] = useState(false);
    const [msg, setMsg] = useState("");
    const {token} = useContext(AuthContext);
    const [maxvacantes, setMaxvacantes] = useState(0);
    

    
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const userId = tokenPayload.sub;

    useEffect(() => {
        // Llamar a handleClickGetCategory solo una vez al crear el componente
        handleClickGetVehiculos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
    useEffect(() => {
        // Llamar a handleClickGetCategory solo una vez al crear el componente
        console.log("max vacantes", maxvacantes)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [maxvacantes]);

    
    const config = {
        'method': 'get',
        'url': `${API_URL}/vehiculos/conductor/${userId}`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

    const configpost = {
        'method': 'post',
        'url': `${API_URL}/viajes`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

      
    const handleClickGetVehiculos  = async () => {
        let response = await axios(config);
        setVehiculos(response.data);
        setVehiculo(response.data[0].id)
        setMaxvacantes(response.data[0].capacidad)
        console.log("data primer vehiculo", response.data[0])
        console.log("vacantes dicponibles de primer", response.data[0].capacidad)
    }



    const handleClickPost = async(event) => {
        event.preventDefault();
        console.log("vehiculo:", vehiculo);
        console.log("salida:", Inputhorario_salida);
        console.log("llegada:", Inputhorario_llegada);
        console.log("origen:", Inputorigen);
        console.log("vacantes:", Inputvacantes_disponibles);

        
        const nuevo_viaje = {    
            vacantes_disponibles: Inputvacantes_disponibles, 
            id_vehiculo: vehiculo, 
            horario_salida: Inputhorario_salida,
            horario_llegada: Inputhorario_llegada,
            origen: Inputorigen,
            destino: Inputdestino,
            tarifa: Inputtarifa,
            id_conductor: userId
          };

        try {
            const response = await axios.post( `${API_URL}/viajes`,
            nuevo_viaje, {headers: 
                {'Authorization': `Bearer ${token}`}}
            );
            console.log(response)
            console.log("se creó")
            
            console.log("viaje creado: ", viajeCreated);
            setViajeCreated(true);
            setMsg(`Turno creado`);
            console.log("viaje creado: ", viajeCreated);
            
        } catch(error){
            console.log(error)
            console.log('hubo un error')
            setMsg("Hubo un error al crear el turno")
            console.log("viaje creado:", viajeCreated);
        }


    };

    const handleSalida = (date) => {
        setInputHorario_salida(date);
        console.log(date)
    };

    const handleLlegada = (date) => {
        setInputHorario_llegada(date);
        console.log(date)
    };
    

    return(
        <>
        <div className="sign up template d-flex justify-content-center align-items-center vh-100">
            <div style={{ marginTop: '100px' }} className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
             <form onSubmit={handleClickPost}>  
                {!viajeCreated && 
                <div>
                    <h3 className="text-center">Crear turno</h3>
                    <div className="mb-2">
                        <label htmlFor = "destino">¿Hacia dónde vas?</label>
                        <input 
                        className="form-control"
                        value={Inputdestino}
                        onChange={(event) => setInputDestino(event.target.value)}
                        required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "origen">¿Desde dónde vas?</label>
                        <input 
                        className="form-control"
                        value={Inputorigen}
                        onChange={(event) => setInputOrigen(event.target.value)}
                        required/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor = "horario-salida">Horario de salida</label>
                        <div className='horario-salida'>
                            <DatePicker 
                            showTimeInput
                            showIcon
                            dateFormat = "h:mm aa dd/MM/yyyy"
                            timeCaption = {"Hora"}
                            title = "Fecha"
                            locale = "es"
                            selected={Inputhorario_salida}
                            onChange={handleSalida}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                    <label htmlFor = "vehiculo">Selecciona un vehículo</label>
                        <select name="vehiculo" onChange={(event) => {
                            const selectedVehiculo = JSON.parse(event.target.value);
                            setVehiculo(selectedVehiculo.id);
                            setMaxvacantes(selectedVehiculo.capacidad);
                            console.log("vehiculo", selectedVehiculo.id);
                            console.log("vehiculo cap", selectedVehiculo.capacidad);}}>
                            {vehiculos.map((vehiculo) => (
                        <option key={vehiculo.id} value={JSON.stringify(vehiculo)}>
                            {vehiculo.nombre}
                        </option>
                        ))}
                        </select>
                    </div>
                    
                    <div className='mb-2'>
                        <label htmlFor = "horario-llegada">Horario de llegada</label>
                        <div className='horario-llegada'>
                            <DatePicker 
                            showTimeInput
                            showIcon
                            dateFormat = "h:mm aa dd/MM/yyyy"
                            timeCaption = {"Hora"}
                            title = "Fecha"
                            locale = "es"
                            selected={Inputhorario_llegada}
                            onChange={handleLlegada} 
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor = "tarifa">Tarifa</label>
                        <input 
                        type= 'number' 
                        className="form-control"
                        value={Inputtarifa}
                        onChange={(event) => setInputTarifa(event.target.value)}
                        min = {0}
                        required/>
                    </div>
                    

                    <div className="mb-2">
                        <label htmlFor = "vacantes disponibles">Vacantes disponibles</label>
                        <input 
                        type= 'number'
                        className="form-control"
                        value={Inputvacantes_disponibles}
                        onChange={(event) => setInputVacantes_disponibles(event.target.value)}
                        min = {0}
                        max = {maxvacantes}
                        required/>
                    </div>
                    <div className="d-grid">
                    <div className="buttons">
                        <button className="btn btn-outline-primary px-4">Enviar</button>
                    </div>
                    </div>
                </div>
                }

                <div> 
                {msg &&  <h5 className="errormsj">{msg} {maxvacantes}</h5>}
                </div>
                
                <div> {viajeCreated && <div class="buttons">
                <button onClick={() => {
                    setViajeCreated(false); 
                    setInputVacantes_disponibles(""); 
                    setInputDestino(""); 
                    setInputOrigen(""); 
                    setInputTarifa("");
                    setInputHorario_llegada(new Date());
                    setInputHorario_salida(new Date());
                    setMsg("");
                    setVehiculo(vehiculos[0].id)
                    }} className="btn btn-outline-primary px-4">Volver</button> </div>}</div>
                
            
            </form>
            </div>
        </div>
        </>    
    )
}