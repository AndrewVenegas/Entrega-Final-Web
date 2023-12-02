
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import API_URL from "../../../config.js";
import DataTableVehiculos from "../component/DataTableVehiculos.jsx";




export default function DashboardVehiculos() {
  // COMO ES VISTA PROTEGIDA, HACEMOS ESTO:
  const {token} = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const config = {
      'method': 'get',
      'url': `${API_URL}/ejemplo-protegido/RutaAdmin`,
      'headers': {
          'Authorization': `Bearer ${token}`
      }
  };

  const navegate = useNavigate();

  useEffect (() => {
      axios(config)
      .then((response) => {
          console.log("Eres admin");
          setMsg(response.data.message);
      })
      .catch((error) => {
          console.log("No logeaste como admin");
          console.log(error);
          setMsg("Debes ser admin para ver esto");
          // setMsg(error.message);
          navegate("/login/admin");
          console.log(error.message);
      })
  }, [])


  const handleCreateNewVehiculo = () => {
    navegate("/admin/vehiculos/create");
  }

  return (
    <> 
      <h1>Aquí están los vehículos registrados.</h1>
      <button 
      className="btn btn-primary add-new-admin-button"
      style={{ marginBottom: '20px' }}
      onClick={handleCreateNewVehiculo}
      >
            
            + Agregar vehículo
        </button>
      <DataTableVehiculos/>
    </>
  )
}
