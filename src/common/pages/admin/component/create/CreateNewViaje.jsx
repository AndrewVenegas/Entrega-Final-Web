import './CreateNewViaje.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState, useEffect, useContext } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { AuthContext } from "../../../../../auth/AuthContext";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import axios from "axios";
registerLocale('es', es)
import API_URL from '../../../../config';

export default function CreateNewViaje() {

    const [Inputvacantes_disponibles, setInputVacantes_disponibles] = useState("");
    const [Inputhorario_llegada, setInputHorario_llegada] = useState(new Date());
    const [Inputhorario_salida, setInputHorario_salida] = useState(new Date());
    const [Inputorigen, setInputOrigen] = useState("");
    const [Inputdestino, setInputDestino] = useState("");
    const [Inputtarifa, setInputTarifa] = useState("");
    const [vehiculos, setVehiculos] = useState([""]);
    const [vehiculo, setVehiculo] = useState("");
    const [choferes, setChoferes] = useState([""]);
    const [chofer, setChofer] = useState("");
    const [choferElegido, setChoferElegido] = useState("");
    const [vehiculoElegido, setVehiculoElegido] = useState("");
    const [primerPasajero, setPrimerPasajero] = useState(null);
    const [choferId, setChoferId] = useState(0);
    
    const [maxvacantes, setMaxvacantes] = useState(0);

    const [viajeCreated, setViajeCreated] = useState(false);
    const [msg, setMsg] = useState("");
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const config = {
        'method': 'get',
        'url': `${API_URL}/vehiculos/conductor/${chofer}`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

    const config2 = {
        'method': 'get',
        'url': `${API_URL}/pasajeros`,
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

    useEffect(() => {
        // Llamar a handleClickGetCategory solo una vez al crear el componente
        handleClickGetChoferes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickGetChoferes = async () => {
        try {
            const response = await axios(config2);
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


    useEffect(() => {
        // Obtener los vehículos del chofer seleccionado
        const handleClickGetVehiculos = async () => {
            console.log("Chofer elegido:", choferElegido)
            if (choferElegido) {
                try {
                    const response = await axios.get(`${API_URL}/vehiculos/conductor/${choferElegido}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Vehículos del chofer elegido:", response.data )

                    setVehiculos(response.data);
                    setVehiculo(response.data[0].id); // Esto es opcional, selecciona el primer vehículo por defecto
                    setVehiculoElegido(response.data[0].id);
                    setMaxvacantes(response.data[0].capacidad)
                } catch (error) {
                    console.error("Hubo un error al obtener los vehículos:", error);
                    setVehiculos([""]); // Limpiamos la lista de vehículos
                    setVehiculo(""); // Limpiamos el vehículo seleccionado
                }
            }
        };

        handleClickGetVehiculos();
    }, [choferElegido, token]);



    const handleClickPost = async (event) => {
        event.preventDefault();
        console.log("vehiculo:", vehiculo);
        console.log("salida:", Inputhorario_salida);
        console.log("llegada:", Inputhorario_llegada);
        console.log("origen:", Inputorigen);
        console.log("vacantes:", Inputvacantes_disponibles);


        const nuevo_viaje = {
            vacantes_disponibles: Inputvacantes_disponibles,
            id_vehiculo: vehiculoElegido,
            horario_salida: Inputhorario_salida,
            horario_llegada: Inputhorario_llegada,
            origen: Inputorigen,
            destino: Inputdestino,
            tarifa: Inputtarifa,
            // estado: "Incompleto",
            id_conductor: choferElegido
        };

        try {
            const response = await axios.post(`${API_URL}/viajes`,
                nuevo_viaje, {
                    headers:
                        { 'Authorization': `Bearer ${token}` }
            }
            );
            console.log(response)
            console.log("se creó")

            console.log("viaje creado: ", viajeCreated);
            setViajeCreated(true);
            setMsg(`Turno creado`);
            console.log("viaje creado: ", viajeCreated);

        } catch (error) {
            console.log(error.response.data)
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

    const handleClickGoBack = () => {
        navigate("/admin/viajes")
    }

    return (
        <>
            <div className="sign up template d-flex justify-content-center align-items-center vh-100 w-100">
                <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <form onSubmit={handleClickPost}>
                        {!viajeCreated &&
                            <div>
                                <h3 className="text-center">Crear Viaje</h3>

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
                                    <label htmlFor="destino">¿Hacia dónde vas?</label>
                                    <input
                                        className="form-control"
                                        value={Inputdestino}
                                        onChange={(event) => setInputDestino(event.target.value)}
                                        required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="origen">¿Desde dónde vas?</label>
                                    <input
                                        className="form-control"
                                        value={Inputorigen}
                                        onChange={(event) => setInputOrigen(event.target.value)}
                                        required />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="horario-salida">Horario de salida</label>
                                    <div className='horario-salida'>
                                        <DatePicker
                                            showTimeInput
                                            showIcon
                                            dateFormat="h:mm aa dd/MM/yyyy"
                                            timeCaption={"Hora"}
                                            title="Fecha"
                                            locale="es"
                                            selected={Inputhorario_salida}
                                            onChange={handleSalida}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="vehiculo">Selecciona un vehículo</label>
                                    <select name="vehiculo" onChange={(event) => 
                                        
                                        {   const selectedVehiculo = JSON.parse(event.target.value);
                                            setVehiculoElegido(selectedVehiculo.id);
                                            setMaxvacantes(selectedVehiculo.capacidad);
                                            console.log("vehiculo", selectedVehiculo.id);
                                            console.log("vehiculo cap", selectedVehiculo.capacidad);}}>

                                        {vehiculo !== "" && vehiculo !== undefined ? (
                                            vehiculos.map((vehiculo) => (
                                                <option key={vehiculo.id} value={JSON.stringify(vehiculo)}>
                                                    {vehiculo.nombre}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>
                                                No hay autos disponibles
                                            </option>
                                        )}
                                    </select>
                                </div>

                                <div className='mb-2'>
                                    <label htmlFor="horario-llegada">Horario de llegada</label>
                                    <div className='horario-llegada'>
                                        <DatePicker
                                            showTimeInput
                                            showIcon
                                            dateFormat="h:mm aa dd/MM/yyyy"
                                            timeCaption={"Hora"}
                                            title="Fecha"
                                            locale="es"
                                            selected={Inputhorario_llegada}
                                            onChange={handleLlegada}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="tarifa">Tarifa</label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        value={Inputtarifa}
                                        onChange={(event) => setInputTarifa(event.target.value)}
                                        min={0}
                                        required />
                                </div>


                                <div className="mb-2">
                                    <label htmlFor="vacantes disponibles">Vacantes disponibles</label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        value={Inputvacantes_disponibles}
                                        onChange={(event) => setInputVacantes_disponibles(event.target.value)}
                                        min={0}
                                        max= {maxvacantes}
                                        required />
                                </div>
                                <div className="d-grid">
                                    <div>
                                        <button className="btn btn-primary px-4">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div>
                            {msg && <h5 className="errormsj">{msg}</h5>}
                        </div>

                    </form>
                    <button className="btn btn-outline-secondary" style={{ marginTop: '10px' }} onClick={() => handleClickGoBack()}>Volver</button>
                </div>
            </div>
        </>
    )
}