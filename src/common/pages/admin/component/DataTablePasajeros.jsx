
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
// import './DataTable.css';
import API_URL from "../../../config.js";
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';
import EditPassengerDialog from "./edits/EditPassangerDialog.jsx";

const DataTablePasajeros = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);

  const orderByEsConductor = (data) => {
    return data.sort((a, b) => {
      if (a.es_conductor && !b.es_conductor) {
        return -1;
      }
      if (!a.es_conductor && b.es_conductor) {
        return 1;
      }
      return 0;
    });
  };

  const config_get = {
    'method': 'get',
    'url': `${API_URL}/pasajeros`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center' },
    { field: 'nombre', headerName: 'NOMBRE', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: 'EMAIL', width: 250 },
    // { field: 'es_conductor', headerName: 'ES CONDUCTOR', width: 150, type:"boolean"},
    {
      field: 'es_conductor',
      headerName: 'ES CONDUCTOR',
      width: 150,
      type: "boolean",
      renderCell: (params) => {
        const isConductor = params.value;
        return isConductor ? <CheckCircleOutline style={{ color: 'green' }} /> : <CancelOutlined style={{ color: 'red' }} />;
      }
    },
    { field: 'createdAt', headerName: 'FECHA CREACIÓN', width: 200 },
    { field: 'updatedAt', headerName: 'FECHA MODIFICACIÓN', width: 200 },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        const pasajeroId = params.row.id;

        return (
          <div>
            <button
              className="btn btn-outline-secondary px-1"
              onClick={() => handleEditClick(pasajeroId)}>Editar
            </button>
            <span style={{ margin: '0 5px' }}></span>
            <button
              className="btn btn-outline-danger px-1"
              onClick={() => handleDeleteClick(pasajeroId)}>Eliminar
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
      'url': `${API_URL}/pasajeros/${id}`,
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    };

    console.log(`Editando pasajero ${id}`)
    axios(config_get_id)
      .then((response) => {
        const passengerToEdit = response.data; // Obtener los detalles del pasajero desde la respuesta
        console.log(`El pasajero a editar es: `)
        console.log(passengerToEdit)
        setEditingPassenger(passengerToEdit);
        setOpenDialog(true);
      })
      .catch((error) => {
        console.error(`Error al obtener los detalles del pasajero ${id}:`, error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      });
  };

  const handleCloseDialog = () => {
    setEditingPassenger(null);
    setOpenDialog(false);
  };

  // ELIMINAR pasajero 
  const handleDeleteClick = (id) => {
    // Lógica para eliminar el pasajero con el ID proporcionado
    // Puedes mostrar un diálogo/modal de confirmación antes de eliminar al pasajero
    const config_delete = {
      'method': 'delete',
      'url': `${API_URL}/pasajeros/${id}`,
      'headers': {
          'Authorization': `Bearer ${token}`
      }
    };
    
    // console.log(`Eliminando pasajero ${id}`)
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar la cuenta del usuario ${id}?`);
  
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
          const sortedData = orderByEsConductor(response.data);
          setTableData(sortedData);
        }
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
        // Manejar el error si es necesario
      });
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      {/* <h2>DataTablePasajeros</h2> */}
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
      // checkboxSelection
      />

      <EditPassengerDialog
        open={openDialog}
        onClose={handleCloseDialog}
        passenger={editingPassenger}
      />
    </div>
  )
}

export default DataTablePasajeros;
