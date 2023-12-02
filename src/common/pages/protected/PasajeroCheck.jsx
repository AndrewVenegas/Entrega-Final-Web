// Este componente chequea que el usuario sea realmente un pasajero
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext.jsx";
import API_URL from "../../config.js";

function PasajeroCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const config = {
        'method': 'get',
        'url': `${API_URL}/ejemplo-protegido/RutaPasajero`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect (() => {
        axios(config)
        .then((response) => {
            console.log("Enviaste un token bueno y estás logeado");
            console.log(response);
            console.log("El mensaje es: " + response.data.message)
            setMsg(response.data.message);
        })
        .catch((error) => {
            console.log("Hubo un error, no estás logeado o el token expiró");
            console.log(error);
            setMsg(error.message);
            console.log(error.message);
        })
    }, [])
    return (
        <h1>{msg}</h1>
    )
}    

export default PasajeroCheck;