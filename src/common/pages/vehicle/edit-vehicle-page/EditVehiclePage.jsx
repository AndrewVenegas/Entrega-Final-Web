import './EditVehiclePage.css';
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"
import API_URL from '../../../config';
import COLORES from '../../../colores';

export default function EditVehiclePage() {

    const { token } = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    
    const [editedVehiculo, setEditedVehiculo] = useState(null);

    const navigate = useNavigate();

    const [autoActualizado, setAutoActualizado] = useState("");

    const opcionesColores = COLORES;

    const { id } = useParams();
    console.log("El id del auto es:", id)

    const config_get_vehiculo = {
        'method': 'get',
        'url': `${API_URL}/vehiculos/${id}`,
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      };
  
      console.log(`Editando vehiculo ${id}`)

    useEffect(() => {
        axios(config_get_vehiculo)
        .then((response) => {
          const vehiculoToEdit = response.data; // Obtener los detalles del pasajero desde la respuesta
          console.log(`El vehiculo a editar es: `)
          console.log(vehiculoToEdit)
          setEditedVehiculo(vehiculoToEdit);
        })
        .catch((error) => {
          console.error(`Error al obtener los detalles del vehiculo ${id}:`, error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        });
    }, []);
     
    
    const handleInputChange = (field, value) => {
        setEditedVehiculo({ ...editedVehiculo, [field]: value });
    };

    const handleClickPut = async (event) => {
        if (
            !editedVehiculo.nombre ||
            !editedVehiculo.patente ||
            !editedVehiculo.modelo ||
            !editedVehiculo.marca ||
            !editedVehiculo.ano ||
            !editedVehiculo.color ||
            !editedVehiculo.capacidad 

        ) {
            console.log('Por favor, completa todos los campos. POR COMPLETAR');
            return; // Detener el guardado si algún campo está vacío
        }

        const id = editedVehiculo.id;
        editedVehiculo.ano = parseInt(editedVehiculo.ano);
        editedVehiculo.capacidad = parseInt(editedVehiculo.capacidad);
        // Pasamos solamente lo que queremos modificar
      
        console.log('Vehículo editado:', editedVehiculo);
        const config_put = {
            'method': 'put',
            'url': `${API_URL}/vehiculos/${id}`,
            'headers': {
              'Authorization': `Bearer ${token}`
            },
            'data': editedVehiculo
          };
        
        try {
            const response = await axios(config_put);
            console.log(response);
            console.log(`Viaje ${editedVehiculo.id} actualizado.`);
            setEditedVehiculo(null);
            setAutoActualizado(true);
            setMsg(`Auto ${editedVehiculo.nombre} actualizado correctamente.`);
        } catch(error){
            console.log(error)
            console.log('hubo un error')

            setMsg("Hubo un error al actualizar el vehiculo.");
            setMsg(error.response.data.message);
            setAutoActualizado(false);
        }}



        const handleClickVolver = () => {
            navigate("/mis-autos");
        }
        
    return (
        <div>
            <div className="sign up template d-flex justify-content-center align-items-center vh-100">
                <div className="form_container p-5 rounded shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <form>  
                        {!autoActualizado &&              
                        <div>
                            <h3 className="text-center">Editar auto</h3>
                            <div className="mb-2">
                                <label htmlFor="nombre">Nombre/Alias</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={editedVehiculo?.nombre}
                                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Patente</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={editedVehiculo?.patente}
                                    onChange={(e) => handleInputChange('patente', e.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nombre">Modelo</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={editedVehiculo?.modelo}
                                    onChange={(e) => handleInputChange('modelo', e.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nombre">Marca</label>
                                <input
                                    type='nombre'
                                    className="form-control"
                                    value={editedVehiculo?.marca}
                                    onChange={(e) => handleInputChange('marca', e.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="color">Color</label>
                                <select
                                    className="form-select"
                                    value={editedVehiculo?.color}
                                    onChange={(event) => handleInputChange('color', event.target.value)}
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
                                <label htmlFor="telefono">Año</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    value={editedVehiculo?.ano}
                                    onChange={(e) => handleInputChange('ano', e.target.value)}
                                    required />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="telefono">Capacidad</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    value={editedVehiculo?.capacidad}
                                    onChange={(event) => handleInputChange('capacidad', event.target.value)}
                                    required />
                            </div>
                            <div className="d-grcarId">
                            <button type="button" className="btn btn-primary px-4" onClick={handleClickPut}>
                                Actualizar datos
                            </button>
                            </div>
                        </div>}
                    <div> 
                        {msg && <h2 className="errormsj">{msg}</h2>}
                    </div>
                    <div></div>
                    </form>
                    <button onClick={handleClickVolver} className="btn btn-dark" style={{ marginTop: '10px' , marginLeft: '10px'}}>
                    Volver
                    </button>
                </div>
            </div>
        </div>
    )
}