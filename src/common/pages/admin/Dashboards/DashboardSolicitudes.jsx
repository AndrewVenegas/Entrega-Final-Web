import LogoutButton from "../../profile/Logout.jsx";
import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import DataTableSolicitudes from "../component/DataTableSolicitudes.jsx"
import { DataGrid } from '@mui/x-data-grid';
import API_URL from "../../../config.js";




export default function DashboardSolicitudes() {
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

  return (
    <> 
      <h1>Aquí están las solicitudes de chofer</h1>
      <DataTableSolicitudes/>
    </>
    
  )
}
