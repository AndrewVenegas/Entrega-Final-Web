import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import API_URL from "../../../config.js";

export default function PruebaProtegida() {

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
        
        <h1>{msg}</h1>
        
    )
}    