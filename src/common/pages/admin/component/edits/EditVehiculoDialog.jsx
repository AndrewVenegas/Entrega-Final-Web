import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config.js';
import COLORES from '../../../../colores.js';
import { AuthContext } from '../../../../../auth/AuthContext.jsx';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const EditViajeDialog = ({ open, onClose, vehiculo }) => {
    const [editedVehiculo, setEditedVehiculo] = useState(null);

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const opcionesColores = COLORES;

    // console.log(`Vehiculo que recibí: ${vehiculo}`)
    // console.log('Vehiculo que recibí:', JSON.stringify(vehiculo, null, 2));

    useEffect(() => {
        console.log(`El vehiculo que recibí:`)
        console.log(vehiculo);
        console.log("Arriba el vehiculo que recibi")
        setEditedVehiculo(vehiculo);

    }, [vehiculo]);




    const handleInputChange = (field, value) => {
        setEditedVehiculo({ ...editedVehiculo, [field]: value });
    };

    const handleSaveChanges = () => {

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
            const response = axios(config_put);
            console.log(response);
            console.log(`Viaje ${editedVehiculo.id} actualizado.`);
            setEditedVehiculo(null);
            onClose();
            window.location.reload();
        } catch(error){
            console.log(error)
            console.log('hubo un error')

            setMsg("Hubo un error al actualizar el vehiculo.");
            setMsg(error.response.data.message);
        }}
        
    
        return (
            <Dialog open={open} onClose={onClose}>
              <DialogTitle>Editar Vehículo</DialogTitle>
              <DialogContent>
                
                    <TextField
                        label="Nombre/Alias"
                        value={editedVehiculo?.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Patente"
                        value={editedVehiculo?.patente}
                        onChange={(e) => handleInputChange('patente', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />


                    <TextField
                        label="Modelo"
                        value={editedVehiculo?.modelo}
                        onChange={(e) => handleInputChange('modelo', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />


                    <TextField
                        label="Marca"
                        value={editedVehiculo?.marca}
                        onChange={(e) => handleInputChange('marca', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />


                    <TextField
                        label="Año"
                        type='number'
                        value={editedVehiculo?.ano}
                        onChange={(e) => handleInputChange('ano', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <select
                        className="form-select"
                        value={editedVehiculo?.color}
                        onChange={(event) => handleInputChange('color', event.target.value)}
                        required
                    >
                        <option value="">Selecciona un color</option>
                        {opcionesColores.map((color) => (
                            <option key={color.valor} value={color.valor} selected={editedVehiculo?.color === color.valor}>
                                {color.nombre}
                            </option>
                        ))}
                    </select>

                    <TextField
                        label="Capacidad"
                        type='number'
                        value={editedVehiculo?.capacidad}
                        onChange={(e) => handleInputChange('capacidad', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />


              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
              </DialogActions>
            </Dialog>
          );
};

export default EditViajeDialog;

// return (
//     <Dialog open={open} onClose={onClose}>
//         <DialogTitle>Editar Viaje</DialogTitle>
//         <DialogContent>
//             {/* Mostrar campos para cada atributo editable */}
//             {/* {renderInputFields()} */}
//             <TextField
//                 label="Destino"
//                 value={editedVehiculo?.destino}
//                 onChange={(e) => handleInputChange('destino', e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 required
//                 />

//         </DialogContent>
//         <DialogActions>
//             <Button onClick={onClose}>Cancelar</Button>
//             <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
//         </DialogActions>
//     </Dialog>
// );


{/* <TextField
    label="Email"
    value={editedVehiculo?.email}
    onChange={(e) => handleInputChange('email', e.target.value)}
    fullWidth
    margin="normal"
    /> */}
{/* 
<TextField
    label="Contraseña"
    type='password'
    value={editedVehiculo?.contrasena}
    onChange={(e) => handleInputChange('contrasena', e.target.value)}
    fullWidth
    margin="normal"
    /> */}

{/* <TextField
    label="Teléfono"
    value={editedVehiculo?.telefono}
    onChange={(e) => handleInputChange('telefono', e.target.value)}
    fullWidth
    margin="normal"
    /> */}
{/* 
<TextField
    label="Imagen"
    value={editedVehiculo?.imagen}
    onChange={(e) => handleInputChange('imagen', e.target.value)}
    fullWidth
    margin="normal"
    /> */}

{/* <InputLabel id="es-conductor-label">Es Conductor</InputLabel>
<Select
label="Es Conductor"
value={editedVehiculo?.es_conductor}
onChange={(e) => handleInputChange('es_conductor', e.target.value)}
fullWidth
margin="normal"
>
<MenuItem value={true}>Sí</MenuItem>
<MenuItem value={false}>No</MenuItem>
</Select> */}

// Función para renderizar los campos de entrada para cada atributo modificable
//   const renderInputFields = () => {
    //     // const editableFields = ['nombre', 'contrasena', 'telefono', 'imagen'];
    
    //     const editableFields = ['nombre', 'telefono', 'imagen'];
    //     // Verificar si editedVehiculo es null o undefined antes de mapear sus propiedades
    //     if (!editedVehiculo) {
        //       return null; // O podrías retornar un mensaje indicando que no hay datos para mostrar
        //     }
        
        //     return editableFields.map((field) => (
            //       <TextField
            //         key={field}
            //         label={field.charAt(0).toUpperCase() + field.slice(1)}
            //         value={editedVehiculo[field]}
            //         onChange={(e) => handleInputChange(field, e.target.value)}
            //         fullWidth
            //         margin="normal"
            //       />
            //     ));
//   };