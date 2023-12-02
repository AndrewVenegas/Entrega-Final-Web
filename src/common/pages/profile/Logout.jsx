import React, {useContext, useState} from "react";
// import '.LogInPage.css';
import { AuthContext } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleLogout = () => {
        // la logout es una función que viene del AuthContext y cambia el token a null
        logout();
        setMsg("Has cerrado sesión");
        navigate("/")
    }

    return (
        <>
            {msg.length > 0 && <div className="successMsg">{msg}</div>}
            <button onClick={handleLogout} className="btn btn-dark" style={{ marginTop: '10px' }}>
                Cerrar sesión
            </button>
        </>
        
    );
}

export default LogoutButton;