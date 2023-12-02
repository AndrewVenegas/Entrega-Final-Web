import { AuthContext } from '../../../../auth/AuthContext';
import { useParams } from 'react-router';
import axios from 'axios';
import API_URL from '../../../config';
import { DataGrid } from '@mui/x-data-grid';
import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';


export default function SolicitudesViajeChofer() {
    const [solicitudes, setSolicitudes] = useState([]);
    const {token, setToken} = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

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
        'url': `${API_URL}/solicitudes/viaje/${id}`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
      };


      const config_get2 = {
        'method': 'get',
        'url': `${API_URL}/pasajeros`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
      };
    
      const columns = [
        { field: 'id', headerName: 'ID', align: 'center', headerAlign: 'center'},
        { field: 'id_pasajero', headerName: 'N° PASAJERO', width: 150, align: 'center', headerAlign: 'center' },
        {field: 'nombre', headerName: 'NOMBRE', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'estado', headerName: 'ESTADO' , width: 150 },
        {
          field: 'actions',
          headerName: 'ACCIONES',
          width: 200,
          renderCell: (params) => {
            const { estado } = params.row;
            if (estado === 'Pendiente') {
              return (
                <div className="action">
                  <button
                    className="btn btn-outline-primary px-1"
                    onClick={() => handleAcceptClick(params.row.id, params.row.id_pasajero)}
                  >
                    Aceptar
                  </button>
      
                  <span style={{ margin: '0 5px' }}></span>
      
                  <button
                    className="btn btn-outline-danger px-1"
                    onClick={() => handleRejectClick(params.row.id, params.row.id_pasajero)}
                  >
                    Rechazar
                  </button>
                </div>
              );
            }
            // Si el estado no es 'Pendiente', no se renderizan los botones
            return null;
          },
        },
        { field: 'comentario', headerName: 'COMENTARIO', width: 600 },
      ];
    

        // HACEMOS MANEJO DE RECHAZO
        const handleRejectClick = (id_solicitud, id_pasajero) => {

          const config_put = {
              'method': 'put',
              'url': `${API_URL}/solicitudes/${id_solicitud}`,
              'headers': {
                  'Authorization': `Bearer ${token}`
                  },
              'data': 
                  {
                      'estado': 'Rechazado'
                  },
            };
          
      

            axios(config_put)
            .then((response) => {
              // console.log(response.data);
            console.log(`Solicitud con ID ${id_solicitud} rechazada`);
            // se crea la notificacion correspondiente

            const config_post_notifiacion = {
              'method': 'post',
              'url': `${API_URL}/notificaciones`,
              'headers': {
                  'Authorization': `Bearer ${token}`
                  },
              'data': 
                  {
                      'tipo': 'pasajero',
                      'contenido': `Se ha rechazado tu solicitud de inscribirte al viaje ${id}. Te invitamos a que revises otras opciones en la página principal.`,
                      'id_pasajero': id_pasajero,
                      'header': 'Cambio en el estado de tu solicitud',
                      'id_viaje': id,
                      'titulo': 'Se han realizado cambios en tu solicitud de inscripción a un viaje',
                  },
              }

            axios(config_post_notifiacion)
            .then( (response) => {
              console.log("Se ha creado la notificacion de rechazo solicitud viaje")
              console.log(response)
            }) .catch( (error) => {
              console.log("Hubi un error creando la solicitud de aviso rechazo viaje")
              console.log(error)
            })
                
            })
            .catch((error) => {
              console.error(`Hubo un error al aceptar la solicitud con ID ${id}:`, error);
              // Manejar el error si es necesario
            });
            window.location.reload();
        };


    // MANEJAMOS EL ACEPTAR
    const handleAcceptClick = (id_solicitud, id_pasajero) => {

        const config_put = {
            'method': 'put',
            'url': `${API_URL}/solicitudes/${id_solicitud}`,
            'headers': {
                'Authorization': `Bearer ${token}`
                },
            'data': 
                {
                    'estado': 'Aceptado'
                },
          };

          const config_get_viaje = {
            'method': 'get',
            'url': `${API_URL}/viajes/${id}`,
            'headers': {
                'Authorization': `Bearer ${token}`
                }
          };

          const config_post_viaje_pasajero = {
            'method': 'post',
            'url': `${API_URL}/viajes-pasajero`,
            'headers': {
                'Authorization': `Bearer ${token}`
                },
            'data': 
                {
                    'id_viaje': id,
                    'id_pasajero': id_pasajero
                },
          };


          axios(config_put)
          .then((response) => {
            // console.log(response.data);

                console.log(`Solicitud con ID ${id_solicitud} aceptada`);
                console.log(response)

                // Se realiza get del viaje para obtener las vacantes
                axios(config_get_viaje)
                .then((response) => {
                  console.log(response.data)
                  console.log("get de viaje correcto")
                  console.log("vacantes",response.data.vacantes_disponibles)

                  const config_put_viaje = {
                    'method': 'put',
                    'url': `${API_URL}/viajes/${id}`,
                    'headers': {
                        'Authorization': `Bearer ${token}`
                        },
                    'data': {
                            'vacantes_disponibles': response.data.vacantes_disponibles-1
                        },
                  };
                    
                    // Se realiza put del viaje
                      axios(config_put_viaje)
                    .then((response) => {
                      console.log(response.data)
                      console.log("put de viaje correcto")
                      console.log("vacantes",response.data.vacantes_disponibles)
                    
                      // Se realiza post en viaje_pasajero
                      axios(config_post_viaje_pasajero)
                    .then((response) => {
                      console.log(response.data)
                      console.log("post de viaje pasajero correcto")
                      // se crea la notificacion correspondiente

                      const config_post_notifiacion = {
                        'method': 'post',
                        'url': `${API_URL}/notificaciones`,
                        'headers': {
                            'Authorization': `Bearer ${token}`
                            },
                        'data': 
                            {
                                'tipo': 'pasajero',
                                'contenido': `Se ha aceptado tu solicitud de inscribirte al viaje ${id}. Te invitamos a que veas más información en Mis Viajes.`,
                                'id_pasajero': id_pasajero,
                                'header': 'Cambio en el estado de tu solicitud',
                                'id_viaje': id,
                                'titulo': 'Se han realizado cambios en tu solicitud de inscripción a un viaje',
                            },
                        }

                      axios(config_post_notifiacion)
                      .then( (response) => {
                        console.log("Se ha creado la notificacion de aceptar solicitud viaje")
                        console.log(response)
                      }) .catch( (error) => {
                        console.log("Hubi un error creando la solicitud de aviso aceptar viaje")
                        console.log(error)
                      })
                      window.location.reload();
                    
                    
                    }). catch((error) => {
                      console.error('Hubo un error en el post de viaje pasajero', error)
                    })
                    
                    
                    }). catch((error) => {
                      console.error('Hubo un error en el put del viaje', error)
                    })

                    

                }). catch((error) => {
                  console.error('Hubo un error en el get del viaje', error)
                })
                // Volvemos a cargar los datos en la tabla después de aceptar la solicitud
                
          })

              
          .catch((error) => {
            console.error(`Hubo un error al aceptar la solicitud con ID ${id}:`, error);
            // Manejar el error si es necesario
          });
          //window.location.reload();
      };
        

// CARGAMOS LOS DATOS EN LA TABLA
useEffect(() => {
  Promise.all([axios(config_get), axios(config_get2)])
    .then(([response1, response2]) => {
      if (response1.data && response2.data) {
        const solicitudes = response1.data;
        const pasajeros = response2.data;

        // Unir los datos de solicitudes y pasajeros usando el campo id_pasajero
        const dataWithNames = solicitudes.map((solicitud) => {
          const pasajero = pasajeros.find(
            (pasajero) => pasajero.id === solicitud.id_pasajero
          );
          return {
            ...solicitud,
            nombre: pasajero ? pasajero.nombre : 'No encontrado', // Agrega el nombre del pasajero
          };
        });

        // Ordenar y establecer los datos en la tabla
        const sortedData = orderByStatus(dataWithNames);
        setTableData(sortedData);
      }
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los datos:", error);
      // Manejar el error si es necesario
    });
}, []);

    
    const handleClickGoBack = () => {
    navigate(`/viajes/${id}`)
    };

    return (
        <div style={{height:600, width: '100%'}}>
            {/* <h2>DataTableSolicitudes</h2> */}
            <DataGrid 
            rows={tableData} 
            columns={columns} 
            pageSize={10}
            // checkboxSelection
             />
             <br></br>
            <button onClick={handleClickGoBack} className="btn btn-secondary"> Volver </button>
        </div>
    )
}
