
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
// import './DataTable.css';
import API_URL from "../../../config.js";



const DataTableViajes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const {token, setToken} = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);

    const orderByStatus = (data) => {
      const order = { Pendiente: 1, Aceptado: 2, Rechazado: 3 };
    
      return data.sort((a, b) => {
        if (order[a.estado] < order[b.estado]) {
          return -1;
        } else if (order[a.estado] > order[b.estado]) {
          return 1;
        } else {
          return 0;
        }
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
        { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center'},
        { field: 'nombre', headerName: 'NOMBRE', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'email', headerName: 'EMAIL' , width: 150 },
        { field: 'es_conductor', headerName: 'ES CONDUCTOR', width: 150 },
        { field: 'createdAt', headerName: 'FECHA CREACIÓN', width: 150 },
        { field: 'updatedAt', headerName: 'FECHA MODIFICACIÓN', width: 150 }
      ];
    
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
            
        </div>
    )
}

export default DataTableViajes;
