
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import API_URL from "../../../config.js";
import DataTablePasajeros from "../component/DataTablePasajeros.jsx";




export default function DashboardPasajeros() {
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
          console.log("PASANDO POR AQUI POR X VEZ")
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

  const handleCreateNewPassenger = () => {
    navegate("/admin/pasajeros/create");
  }

  return (
    <> 
      <h1>Aquí están los pasajeros registrados.</h1>
      <button 
      className="btn btn-primary add-new-admin-button"
      style={{ marginBottom: '20px' }}
      onClick={handleCreateNewPassenger}
      >
            
            + Agregar pasajero
        </button>

      <DataTablePasajeros/>
    </>
  )
}
