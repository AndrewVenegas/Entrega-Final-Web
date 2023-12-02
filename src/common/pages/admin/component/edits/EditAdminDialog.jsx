import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../../../config.js';
import { AuthContext } from '../../../../../auth/AuthContext.jsx';


const EditPassengerDialog = ({ open, onClose, admin }) => {
    const [editedAdmin, setEditedAdmin] = useState(null);
    const [contrasenaInicial, setContrasenaInicial] = useState(null);
    const [buleano, setBuleano] = useState(false);
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(`1Pasajero que recibí: ${admin}`)
    console.log('2Pasajero que recibí:', JSON.stringify(admin, null, 2));

    useEffect(() => {
        console.log(`4Pasajero que recibí:`)
        setEditedAdmin(admin);
        if (buleano === false && admin !== null && admin !== undefined) {
            setBuleano(true);
            setContrasenaInicial(admin.contrasena);
        }
    }, [admin]);

    // if (admin === null || admin === undefined) {
    //     console.log('3Pasajero es null o undefined');
    // } else {
    //     console.log(`3Pasajero que recibí: ${admin.nombre}`)
    //     setEditedAdmin(admin);
    // }



    const handleInputChange = (field, value) => {
        setEditedAdmin({ ...editedAdmin, [field]: value });
    };

    const handleSaveChanges = () => {
        // Lógica para guardar los cambios del pasajero
        // Puedes enviar los cambios a través de una función prop a tu componente principal
        // onClose() para cerrar el diálogo después de guardar los cambios
        // 
        // Verificar si algún campo está vacío antes de guardar los cambios
        if (
            !editedAdmin.nombre ||
            !editedAdmin.email ||
            !editedAdmin.contrasena 
        ) {
            console.log('Por favor, completa todos los campos. POR COMPLETAR');
            return; // Detener el guardado si algún campo está vacío
        }
        if (editedAdmin.contrasena === contrasenaInicial) {
            console.log('La contraseña no cambió');
            delete editedAdmin.contrasena;
        }
        const id = editedAdmin.id;

        delete editedAdmin.id;
        delete editedAdmin.createdAt;
        delete editedAdmin.updatedAt;

        // Pasamos solamente lo que queremos modificar

        console.log('Pasajero editado:', editedAdmin);
        const config_put = {
            'method': 'put',
            'url': `${API_URL}/admin/${id}`,
            'headers': {
              'Authorization': `Bearer ${token}`
            },
            'data': editedAdmin,
          };
        
        try {
            const response = axios(config_put);
            console.log(response);
            console.log(`Usuario ${editedAdmin.nombre} actualizado.`);
            setEditedAdmin(null);
            onClose();
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
                    value={editedAdmin?.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    />
                <TextField
                    label="Email"
                    value={editedAdmin?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <TextField
                    label="Contraseña"
                    type='password'
                    value={editedAdmin?.contrasena}
                    onChange={(e) => handleInputChange('contrasena', e.target.value)}
                    fullWidth
                    margin="normal"
                    />

                <TextField
                    label="Imagen"
                    value={editedAdmin?.imagen}
                    onChange={(e) => handleInputChange('imagen', e.target.value)}
                    fullWidth
                    margin="normal"
                    />


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
//     // Verificar si editedAdmin es null o undefined antes de mapear sus propiedades
//     if (!editedAdmin) {
//       return null; // O podrías retornar un mensaje indicando que no hay datos para mostrar
//     }

//     return editableFields.map((field) => (
//       <TextField
//         key={field}
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         value={editedAdmin[field]}
//         onChange={(e) => handleInputChange(field, e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//     ));
//   };