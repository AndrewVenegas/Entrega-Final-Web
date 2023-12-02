
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import API_URL from "../../../config.js";
import EditAdminDialog from "./edits/EditAdminDialog.jsx"


const DataTableViajes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const {token, setToken} = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [edittingAdmin, setEdittingAdmin] = useState(null);
    
    const config_get = {
        'method': 'get',
        'url': `${API_URL}/admin/all`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
      };

    
      const columns = [
        { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center'},
        { field: 'nombre', headerName: 'NOMBRE', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'email', headerName: 'EMAIL' , width: 250 },
        // { field: 'contrasena', headerName: 'contrasena', width: 150 },
        { field: 'createdAt', headerName: 'FECHA CREACIÓN', width: 200 },
        { field: 'updatedAt', headerName: 'FECHA MODIFICACIÓN', width: 200 },
        {
          field: 'acciones',
          headerName: 'ACCIONES',
          width: 200,
          renderCell: (params) => {
            const adminId = params.row.id;
    
            return (
              <div>
                <button
                  className="btn btn-outline-secondary px-1"
                  onClick={() => handleEditClick(adminId)}>Editar
                </button>
                <span style={{ margin: '0 5px' }}></span>
                <button
                  className="btn btn-outline-danger px-1"
                  onClick={() => handleDeleteClick(adminId)}>Eliminar
                </button>
              </div>
            );
          },
        },
      ];
    
      // EDITAR
      const handleEditClick = (id) => {
        // Lógica para la edición del admin con el ID proporcionado
        // Puedes redirigir a una página de edición o abrir un diálogo/modal para editar los detalles del admin
        const config_get_id = {
          'method': 'get',
          'url': `${API_URL}/admin/${id}`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
    
        console.log(`Editando admin ${id}`)
        axios(config_get_id)
          .then((response) => {
            const adminToEdit = response.data; // Obtener los detalles del admin desde la respuesta
            console.log(`El admin a editar es: `)
            console.log(adminToEdit)
            setEdittingAdmin(adminToEdit);
            setOpenDialog(true);
          })
          .catch((error) => {
            console.error(`Error al obtener los detalles del admin ${id}:`, error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
          });
      };
    
      const handleCloseDialog = () => {
        setEdittingAdmin(null);
        setOpenDialog(false);
      };
    
      // ELIMINAR admin 
      const handleDeleteClick = (id) => {
        // Lógica para eliminar el admin con el ID proporcionado
        // Puedes mostrar un diálogo/modal de confirmación antes de eliminar al admin
        const config_delete = {
          'method': 'delete',
          'url': `${API_URL}/admin/${id}`,
          'headers': {
              'Authorization': `Bearer ${token}`
          }
        };
        
        // console.log(`Eliminando admin ${id}`)
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar la cuenta del administrador ${id}?`);
      
        if (confirmacion) {
          let huboerror = false;
          try {
            console.log("Voy a eliminar el usuario");
            const response = axios(config_delete);
            console.log(response);
          } catch (error) {
            console.log(error);
            huboerror = true;
          }
          console.log("Pareciera que se eliminó el usuario");
          if (!huboerror) {
            window.location.reload();
            console.log("Se eliminó correctamente")
          }
        } else {
          console.log("Cancelado");
          // Manejar la cancelación si el usuario decide no eliminar la cuenta
        }
      };



// CARGAMOS LOS DATOS EN LA TABLA
    useEffect(() => {
        axios(config_get)
          .then((response) => {
            // Verificar si el componente aún está montado antes de actualizar el estado
            if (response.data) {
              // console.log(response.data);
              setTableData(response.data)
              // const sortedData = orderByStatus(response.data);
              // setTableData(sortedData);
            }
          })
          .catch((error) => {
            console.error("Hubo un error al obtener los datos:", error);
            // Manejar el error si es necesario
          });
      }, []); 

    return (
        <div style={{height:600, width: '100%'}}>
            {/* <h2>DataTableViajes</h2> */}
            <DataGrid 
            rows={tableData} 
            columns={columns} 
            pageSize={10}
            // checkboxSelection
             />
      <EditAdminDialog
        open={openDialog}
        onClose={handleCloseDialog}
        admin={edittingAdmin}
      />
        </div>
    )
}

export default DataTableViajes;
