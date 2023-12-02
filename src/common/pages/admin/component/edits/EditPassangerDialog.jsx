import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config.js';
import { AuthContext } from '../../../../../auth/AuthContext.jsx';


const EditPassengerDialog = ({ open, onClose, passenger }) => {
    const [editedPassenger, setEditedPassenger] = useState(null);
    const [contrasenaInicial, setContrasenaInicial] = useState(null);
    const [buleano, setBuleano] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(`1Pasajero que recibí: ${passenger}`)
    console.log('2Pasajero que recibí:', JSON.stringify(passenger, null, 2));

    useEffect(() => {
        console.log(`4Pasajero que recibí:`)
        setEditedPassenger(passenger);
        if (buleano === false && passenger !== null && passenger !== undefined) {
            setBuleano(true);
            setContrasenaInicial(passenger.contrasena);
        }
    }, [passenger]);

    // if (passenger === null || passenger === undefined) {
    //     console.log('3Pasajero es null o undefined');
    // } else {
    //     console.log(`3Pasajero que recibí: ${passenger.nombre}`)
    //     setEditedPassenger(passenger);
    // }



    const handleInputChange = (field, value) => {
        setEditedPassenger({ ...editedPassenger, [field]: value });
    };

    const handleSaveChanges = () => {
        // Lógica para guardar los cambios del pasajero
        // Puedes enviar los cambios a través de una función prop a tu componente principal
        // onClose() para cerrar el diálogo después de guardar los cambios
        // 
        // Verificar si algún campo está vacío antes de guardar los cambios
        if (
            !editedPassenger.nombre ||
            !editedPassenger.email ||
            !editedPassenger.contrasena ||
            !editedPassenger.telefono
        ) {
            console.log('Por favor, completa todos los campos. POR COMPLETAR');
            return; // Detener el guardado si algún campo está vacío
        }
        if (editedPassenger.contrasena === contrasenaInicial) {
            console.log('La contraseña no cambió');
            delete editedPassenger.contrasena;
        }
        const id = editedPassenger.id;

        delete editedPassenger.id;
        delete editedPassenger.createdAt;
        delete editedPassenger.updatedAt;

        // Pasamos solamente lo que queremos modificar
        editedPassenger.telefono = parseInt(editedPassenger.telefono);
        console.log('Pasajero editado:', editedPassenger);
        const config_put = {
            'method': 'put',
            'url': `${API_URL}/pasajeros/${id}`,
            'headers': {
              'Authorization': `Bearer ${token}`
            },
            'data': editedPassenger,
          };

          const congif_post_notifiacion = {
            'method': 'post',
            'url': `${API_URL}/notificaciones`,
            'headers': {
                'Authorization': `Bearer ${token}`
                },
            'data': 
                {
                  'tipo': 'pasajero',
                  'contenido': 'Por motivos de seguridad el administrador ha modificado datos de tu perfil.',
                  'id_pasajero': id,
                  'header': 'Cambio en tu perfil',
                  'titulo': 'El administrador ha hecho cambios'
                },
            };
        
        try {
            const response = axios(config_put);
            console.log(response);
            console.log(`Usuario ${editedPassenger.nombre} actualizado.`);
            setEditedPassenger(null);
            onClose();
            axios(congif_post_notifiacion)
                .then((response) => {
                    console.log(response)
                    console.log("Notificacion creada en el back")
                }). catch((error) => {
                    console.error('Hubo un error al crear la notificación de edición de pasajero', error)
                })
            window.location.reload();
        } catch(error){
            console.log(error)
            console.log('hubo un error')

            setMsg("Hubo un error al actualizar el usuario.");
            setMsg(error.response.data.message);
        }}

    

    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Pasajero</DialogTitle>
            <DialogContent>
                {/* Mostrar campos para cada atributo editable */}
                {/* {renderInputFields()} */}
                <TextField
                    label="Nombre"
                    value={editedPassenger?.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    />
                <TextField
                    label="Email"
                    value={editedPassenger?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <TextField
                    label="Contraseña"
                    type='password'
                    value={editedPassenger?.contrasena}
                    onChange={(e) => handleInputChange('contrasena', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <TextField
                    label="Teléfono"
                    value={editedPassenger?.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <TextField
                    label="Imagen"
                    value={editedPassenger?.imagen}
                    onChange={(e) => handleInputChange('imagen', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <InputLabel id="es-conductor-label">Es Conductor</InputLabel>
                <Select
                label="Es Conductor"
                value={editedPassenger?.es_conductor}
                onChange={(e) => handleInputChange('es_conductor', e.target.value)}
                fullWidth
                margin="normal"
                >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
                </Select>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPassengerDialog;


// Función para renderizar los campos de entrada para cada atributo modificable
//   const renderInputFields = () => {
//     // const editableFields = ['nombre', 'contrasena', 'telefono', 'imagen'];

//     const editableFields = ['nombre', 'telefono', 'imagen'];
//     // Verificar si editedPassenger es null o undefined antes de mapear sus propiedades
//     if (!editedPassenger) {
//       return null; // O podrías retornar un mensaje indicando que no hay datos para mostrar
//     }

//     return editableFields.map((field) => (
//       <TextField
//         key={field}
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         value={editedPassenger[field]}
//         onChange={(e) => handleInputChange(field, e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//     ));
//   };