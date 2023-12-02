import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config.js';
import { AuthContext } from '../../../../../auth/AuthContext.jsx';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const EditViajeDialog = ({ open, onClose, viaje }) => {
    const [editedViaje, setEditedViaje] = useState(null);
    const [contrasenaInicial, setContrasenaInicial] = useState(null);
    const [Inputhorario_llegada, setInputHorario_llegada] = useState(new Date());
    const [Inputhorario_salida, setInputHorario_salida] = useState(new Date());
    const [buleano, setBuleano] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    // console.log(`1Pasajero que recibí: ${viaje}`)
    // console.log('2Pasajero que recibí:', JSON.stringify(viaje, null, 2));

    useEffect(() => {
        console.log(`El viaje que recibí:`)
        console.log(viaje);
        console.log("Arriba el viaje que recibi")
        setEditedViaje(viaje);
        // setInputHorario_salida(new Date(viaje.horario_salida).toISOString());
        // setInputHorario_salida(viaje.horario_salida);
        if (buleano === false && viaje !== null && viaje !== undefined) {
            setBuleano(true);
            setContrasenaInicial(viaje.contrasena);
        }
    }, [viaje]);

    // if (viaje === null || viaje === undefined) {
    //     console.log('3Pasajero es null o undefined');
    // } else {
    //     console.log(`3Pasajero que recibí: ${viaje.nombre}`)
    //     setEditedViaje(viaje);
    // }



    const handleInputChange = (field, value) => {
        setEditedViaje({ ...editedViaje, [field]: value });
    };

    const handleSaveChanges = () => {
        // Lógica para guardar los cambios del pasajero
        // Puedes enviar los cambios a través de una función prop a tu componente principal
        // onClose() para cerrar el diálogo después de guardar los cambios
        // 
        // Verificar si algún campo está vacío antes de guardar los cambios
        if (
            !editedViaje.destino ||
            !editedViaje.origen 
            // !editedViaje.contrasena ||
            // !editedViaje.telefono
        ) {
            console.log('Por favor, completa todos los campos. POR COMPLETAR');
            return; // Detener el guardado si algún campo está vacío
        }

        const id = editedViaje.id;

        // Pasamos solamente lo que queremos modificar
      
        console.log('Pasajero editado:', editedViaje);
        const config_put = {
            'method': 'put',
            'url': `${API_URL}/viajes/${id}`,
            'headers': {
              'Authorization': `Bearer ${token}`
            },
            'data': {
                ...editedViaje,
                horario_salida: Inputhorario_salida, // Actualiza el campo específico con el estado más actual
                horario_llegada: Inputhorario_llegada // Si es necesario para tu caso
            }
          };
        
        try {
            const response = axios(config_put);
            console.log(response);
            console.log(`Viaje ${editedViaje.id} actualizado.`);
            setEditedViaje(null);
            onClose();
            window.location.reload();
        } catch(error){
            console.log(error)
            console.log('hubo un error')

            setMsg("Hubo un error al actualizar el viaje.");
            setMsg(error.response.data.message);
        }}
        
        const handleSalida = (date) => {
            setInputHorario_salida(date);
            const updatedViaje = { ...editedViaje, horario_salida: date };
            setEditedViaje(updatedViaje);
        };
        
    
        const handleLlegada = (date) => {
            setInputHorario_llegada(date);
            const updatedViaje = { ...editedViaje, horario_llegada: date };
            setEditedViaje(updatedViaje);
        };

    
        return (
            <Dialog open={open} onClose={onClose}>
              <DialogTitle>Editar Viaje</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSaveChanges} id="formEditarViaje">
                <div>

                    <div className="mb-2">
                        <label htmlFor="destino">Destino</label>
                        <input
                            className="form-control"
                            value={editedViaje?.destino}
                            onChange={(e) => handleInputChange('destino', e.target.value)}
                            required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="origen">Origen</label>
                        <input
                            className="form-control"
                            value={editedViaje?.origen}
                            onChange={(e) => handleInputChange('origen', e.target.value)}
                            required />
                    </div>



{/* Falta poner el vehiculo */}


{/* Falta Horario de salida */}
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
{/* Falta horario de llegada */}

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

{/* FALTA ESTADO */}

                    <div className="mb-2">
                        <label htmlFor="tarifa">Tarifa</label>
                        <input
                            type='number'
                            className="form-control"
                            value={editedViaje?.tarifa}
                            onChange={(e) => handleInputChange('tarifa', e.target.value)}
                            min={0}
                            required />
                    </div>


                    <div className="mb-2">
                        <label htmlFor="vacantes disponibles">Vacantes disponibles</label>
                        <input
                            type='number'
                            className="form-control"
                            value={editedViaje?.vacantes_disponibles}
                            onChange={(e) => handleInputChange('vacantes_disponibles', e.target.value)}
                            min={0}
                            required />
                    </div>
                </div>

                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit" form="formEditarViaje">Enviar</Button>
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
//                 value={editedViaje?.destino}
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
    value={editedViaje?.email}
    onChange={(e) => handleInputChange('email', e.target.value)}
    fullWidth
    margin="normal"
    /> */}
{/* 
<TextField
    label="Contraseña"
    type='password'
    value={editedViaje?.contrasena}
    onChange={(e) => handleInputChange('contrasena', e.target.value)}
    fullWidth
    margin="normal"
    /> */}

{/* <TextField
    label="Teléfono"
    value={editedViaje?.telefono}
    onChange={(e) => handleInputChange('telefono', e.target.value)}
    fullWidth
    margin="normal"
    /> */}
{/* 
<TextField
    label="Imagen"
    value={editedViaje?.imagen}
    onChange={(e) => handleInputChange('imagen', e.target.value)}
    fullWidth
    margin="normal"
    /> */}

{/* <InputLabel id="es-conductor-label">Es Conductor</InputLabel>
<Select
label="Es Conductor"
value={editedViaje?.es_conductor}
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
    //     // Verificar si editedViaje es null o undefined antes de mapear sus propiedades
    //     if (!editedViaje) {
        //       return null; // O podrías retornar un mensaje indicando que no hay datos para mostrar
        //     }
        
        //     return editableFields.map((field) => (
            //       <TextField
            //         key={field}
            //         label={field.charAt(0).toUpperCase() + field.slice(1)}
            //         value={editedViaje[field]}
            //         onChange={(e) => handleInputChange(field, e.target.value)}
            //         fullWidth
            //         margin="normal"
            //       />
            //     ));
//   };