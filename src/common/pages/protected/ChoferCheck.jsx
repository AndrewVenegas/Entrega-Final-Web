// Este componente chequea que el usuario sea realmente un pasajero
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../auth/AuthContext.jsx";
import CreateTurno from "../chofer main page/CreateTurno.jsx";
import API_URL from "../../config.js";
import {useNavigate} from "react-router-dom"

function ChoferCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const [eschofer, setEschofer] = useState(false);
    const navigate = useNavigate();


    const config = {
        'method': 'get',
        'url': `${API_URL}/pagina-chofer-protegida/pagina-principal-chofer`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

    const handleclickchofer = () => {
        navigate("/solicitud-chofer");
      }

    useEffect (() => {
        axios(config)
        .then((response) => {
            console.log("Enviaste un token bueno y estás logeado");
            console.log(response);
            console.log("El mensaje es: " + response.data.message)
            setMsg(response.data.message);
            setEschofer(true);
        })
        .catch((error) => {
            console.log("Hubo un error, no estás logeado o el token expiró");
            console.log(error);
            setMsg("Tu usuario no tiene una cuenta de chofer asociada. Para poder acceder a las acciones de chofer manda una solicitud.");
            console.log(error.message);
        })
    }, [])

    // const {isPasajero, setIsPasajero} = useContext(AuthContext); 
    // useEffect ( () => {
    //     if (eschofer) {
    //         setIsPasajero
    //     }
    // }, [eschofer])
    
    return (<>
        {!eschofer && <><br></br>
        <h1>Oh ouch! Parece que aún no eres chofer</h1>
        <p>{msg}</p>
        <br></br>
         <button className="btn btn-outline-primary px-4 ms-3" onClick={handleclickchofer}>Convertirme en chofer</button></>}
        </>
    )
}    

export default ChoferCheck;