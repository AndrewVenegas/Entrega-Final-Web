// Este componente chequea que el usuario sea realmente un pasajero
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config.js";

function AdminCheck(){
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
    const [verificado, setVerificado] = useState(false);

    useEffect (() => {
        axios(config)
        .then((response) => {
            console.log("Enviaste un token bueno y estás logeado y eres admin");
            console.log(response);
            console.log("El mensaje es: " + response.data.message)
            setMsg(response.data.message);
            setVerificado(true);
        })
        .catch((error) => {
            console.log("Hubo un error, no estás logeado o el token expiró o no eres admin");
            console.log(error);
            setMsg("Debes ser admin para ver esto");
            // setMsg(error.message);
            navegate("/login/admin");
            console.log(error.message);
            setVerificado(false);
        })
    }, [])
    return (
        
        verificado && <h1>{msg}</h1>

    )
}    

export default AdminCheck;