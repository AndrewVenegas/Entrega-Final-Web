
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
// import './DataTable.css';
import API_URL from "../../../config.js";
import EditViajeDialog from "./edits/EditViajeDialog.jsx";


const DataTableViajes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingViaje, setEditingViaje] = useState(null);


  const config_get = {
    'method': 'get',
    'url': `${API_URL}/viajes`,
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

  const config_get_vehiculos = {
    'method': 'get',
    'url': `${API_URL}/vehiculos`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center', width: 60 },
    { field: 'id_conductor', headerName: 'ID Chofer', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'nombre', headerName: 'CHOFER', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'id_vehiculo', headerName: 'CAR ID', width: 75 },
    { field: 'vehiculo_name', headerName: 'VEHÍCULO', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'origen', headerName: 'ORIGEN', width: 150 },
    { field: 'destino', headerName: 'DESTINO', width: 150 },
    { field: 'tarifa', headerName: 'TARIFA', width: 75 },
    { field: 'vacantes_disponibles', headerName: 'VACANTES', width: 100 },
    { field: 'estado', headerName: 'ESTADO', width: 100 },
    // { field: 'createdAt', headerName: 'FECHA CREACIÓN', width: 150 },
    // { field: 'updatedAt', headerName: 'FECHA MODIFICACIÓN', width: 150 },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        const viajeId = params.row.id;

        return (
          <div>
            <button
              className="btn btn-outline-secondary px-1"
              onClick={() => handleEditClick(viajeId)}>Editar
            </button>
            <span style={{ margin: '0 5px' }}></span>
            <button
              className="btn btn-outline-danger px-1"
              onClick={() => handleDeleteClick(viajeId)}>Eliminar
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
      'url': `${API_URL}/viajes/${id}`,
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    };

    console.log(`Editando viaje ${id}`)
    axios(config_get_id)
      .then((response) => {
        const viajeToEdit = response.data; // Obtener los detalles del pasajero desde la respuesta
        console.log(`El viaje a editar es: `)
        console.log(viajeToEdit)
        setEditingViaje(viajeToEdit);
        setOpenDialog(true);
      })
      .catch((error) => {
        console.error(`Error al obtener los detalles del viaje ${id}:`, error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      });
  };

  const handleCloseDialog = () => {
    setEditingViaje(null);
    setOpenDialog(false);
  };

  // ELIMINAR pasajero 
  const handleDeleteClick = (id) => {
    // Lógica para eliminar el pasajero con el ID proporcionado
    // Puedes mostrar un diálogo/modal de confirmación antes de eliminar al pasajero
    const config_delete = {
      'method': 'delete',
      'url': `${API_URL}/viajes/${id}`,
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    };

    // console.log(`Eliminando pasajero ${id}`)
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el viaje N° ${id}?`);

    if (confirmacion) {
      let huboerror = false;
      try {
        console.log("Voy a eliminar el viaje");
        const response = axios(config_delete);
        console.log(response);
      } catch (error) {
        console.log(error);
        huboerror = true;
      }
      console.log("Pareciera que se eliminó el viaje");
      if (!huboerror) {
        window.location.reload();
        console.log("Se eliminó correctamente")
      }
    } else {
      console.log("Cancelado");
      // Manejar la cancelación si el usuario decide no eliminar la cuenta
    }
  };


  // Luego, en el useEffect, realiza dos consultas y únelas antes de actualizar los datos de la tabla:

  useEffect(() => {
    Promise.all([
      axios(config_get),
      axios(config_get_pasajeros),
      axios(config_get_vehiculos)
    ])
      .then((responses) => {
        const [viajesResponse, pasajerosResponse, vehiculosResponse] = responses;
        const viajes = viajesResponse.data;
        const pasajeros = pasajerosResponse.data;
        const vehiculos = vehiculosResponse.data;


        // Crear un mapa para almacenar los nombres de los conductores por su ID
        const dataWithNames = viajes.map((viaje) => {
          const pasajero = pasajeros.find(
            (pasajero) => pasajero.id === viaje.id_conductor
          );
          return {
            ...viaje,
            nombre: pasajero ? pasajero.nombre : 'Sin conductor',
          };
        }, {});

        const dataWithVehicules = dataWithNames.map((viaje) => {
          const vehiculo = vehiculos.find(
            (vehiculo) => vehiculo.id === viaje.id_vehiculo
          );
          return {
            ...viaje,
            vehiculo_name: vehiculo ? vehiculo.nombre : 'Vehiculo sin nombre',
          };
        }, {});

        // Actualizar los datos de la tabla con los nombres de los conductores
        setTableData(dataWithVehicules);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
        // Manejar el error si es necesario
      });
  }, []);
  return (
    <div style={{ height: 600, width: '100%' }}>
      {/* <h2>DataTableViajes</h2> */}
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
      // checkboxSelection
      />
      <EditViajeDialog
        open={openDialog}
        onClose={handleCloseDialog}
        viaje={editingViaje}
      />

    </div>
  )
}

export default DataTableViajes;
