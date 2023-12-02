
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
// import './DataTable.css';
import API_URL from "../../../config.js";
import COLORES from "../../../colores.js";
import EditVehiculoDialog from "./edits/EditVehiculoDialog.jsx";
import Swal from 'sweetalert2';


const DataTableVehiculos = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const {token, setToken} = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingVehiculo, setEditingVehiculo] = useState(null);

    const config_get = {
        'method': 'get',
        'url': `${API_URL}/vehiculos`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
      };
  
    const config_get_pasajeros = {
      'method': 'get',
      'url': `${API_URL}/pasajeros`,
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const traducirColor = (colorEnIngles) => {
      const colorEncontrado = COLORES.find((color) => color.valor === colorEnIngles);
    
      return colorEncontrado ? colorEncontrado.nombre : colorEnIngles;
    };
    
    
      const columns = [
        { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center'},
        { field: 'id_conductor', headerName: 'ID CONDUCTOR', width: 125, align: 'center', headerAlign: 'center' },
        { field: 'nombre', headerName: 'APODO', width: 100 },
        { field: 'nombre_conductor', headerName: 'DUEÑO', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'patente', headerName: 'PATENTE', width: 125 },
        { field: 'modelo', headerName: 'MODELO', width: 100 },
        { field: 'marca', headerName: 'MARCA', width: 125 },
        { field: 'ano', headerName: 'AÑO', width: 75 },
        {
          field: 'color',
          headerName: 'COLOR',
          width: 100,
          renderCell: (params) => {
              const colorEnIngles = params.row.color; // Obtener el valor del color en inglés desde la fila
              const colorEnEspanol = traducirColor(colorEnIngles); // Traducir el color a español
              
              return (
                  <span>{colorEnEspanol}</span>
              );
          },
        },
        { field: 'capacidad', headerName: 'CAPACIDAD' , width: 125 },
        {
          field: 'acciones',
          headerName: 'ACCIONES',
          width: 150,
          renderCell: (params) => {
            const vehiculoId = params.row.id;
    
            return (
              <div>
                <button
                  className="btn btn-outline-secondary px-1"
                  onClick={() => handleEditClick(vehiculoId)}>Editar
                </button>
                <span style={{ margin: '0 5px' }}></span>
                <button
                  className="btn btn-outline-danger px-1"
                  onClick={() => handleDeleteClick(vehiculoId)}>Eliminar
                </button>
              </div>
            );
          },
        },
      ];
    
      // EDITAR
      const handleEditClick = (id) => {
        // Lógica para la edición del pasajero con el ID proporcionado
        // Puedes redirigir a una página de edición o abrir un diálogo/modal para editar los detalles del pasajero
        const config_get_id = {
          'method': 'get',
          'url': `${API_URL}/vehiculos/${id}`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
    
        console.log(`Editando vehiculo ${id}`)
        axios(config_get_id)
          .then((response) => {
            const vehiculoToEdit = response.data; // Obtener los detalles del pasajero desde la respuesta
            console.log(`El vehiculo a editar es: `)
            console.log(vehiculoToEdit)
            setEditingVehiculo(vehiculoToEdit);
            setOpenDialog(true);
          })
          .catch((error) => {
            console.error(`Error al obtener los detalles del vehiculo ${id}:`, error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
          });
      };
    
      const handleCloseDialog = () => {
        setEditingVehiculo(null);
        setOpenDialog(false);
      };
    
      // ELIMINAR pasajero 
      const handleDeleteClick = async (id) => {
        // Lógica para eliminar el pasajero con el ID proporcionado
        // Puedes mostrar un diálogo/modal de confirmación antes de eliminar al pasajero
        const config_delete = {
          'method': 'delete',
          'url': `${API_URL}/vehiculos/${id}`,
          'headers': {
            'Authorization': `Bearer ${token}`
          }
        };
    
        // console.log(`Eliminando pasajero ${id}`)
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el vehículo N° ${id}?`);
    
        if (confirmacion) {
          let huboerror = false;
          try {
            console.log("Voy a eliminar el vehículo");
            const response = await axios(config_delete);
            console.log(response);
            if (response.status === 200) {
              console.log("El vehículo se eliminó correctamente");
              window.location.reload();
            } else {
              console.log("Hubo un error al eliminar el vehículo");
              // Manejar el error o mostrar un mensaje al usuario
            }
          } catch (error) {
            // Si ocurre un error durante la eliminación
            console.log(error.response);
    
            // Verificar si el error es debido a las referencias de Viajes
            if (error.response && error.response.data && error.response.data.name === "SequelizeForeignKeyConstraintError") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar',
                    text: 'No se puede eliminar el vehículo, hay viajes asociados a él.'
                });
            } else {
                // Otro tipo de error
                console.error("Error al eliminar el vehículo:", error);
                // Mostrar un mensaje de error genérico si es necesario
            }
        }
    };
    };


      useEffect(() => {
        Promise.all([
          axios(config_get),
          axios(config_get_pasajeros)
        ])
          .then((responses) => {
            const [vehiculosResponse, pasajerosResponse] = responses;
            const vehiculos = vehiculosResponse.data;
            const pasajeros = pasajerosResponse.data;
    
    
            // Crear un mapa para almacenar los nombres de los conductores por su ID
            const dataWithNames = vehiculos.map((vehiculo) => {
              const pasajero = pasajeros.find(
                (pasajero) => pasajero.id === vehiculo.id_conductor
              );
              return {
                ...vehiculo,
                nombre_conductor: pasajero ? pasajero.nombre : 'Sin conductor',
              };
            }, {});
  
            // Actualizar los datos de la tabla con los nombres de los conductores
            setTableData(dataWithNames);
          })
          .catch((error) => {
            console.error("Hubo un error al obtener los datos:", error);
            // Manejar el error si es necesario
          });
      }, []);

    return (
        <div style={{height:600, width: '100%'}}>
            {/* <h2>DataTableVehiculos</h2> */}
            <DataGrid 
            rows={tableData} 
            columns={columns} 
            pageSize={10}
            // checkboxSelection
             />
        <EditVehiculoDialog
          open={openDialog}
          onClose={handleCloseDialog}
          vehiculo={editingVehiculo}
        />
            
        </div>
    )
}

export default DataTableVehiculos;
