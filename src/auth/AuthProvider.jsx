// Este componente toma el Context (token) y se lo pasa a los componentes hijos

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoged, setIsLoged] = useState(false);
    const [isPasajero, setIsPasajero] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    // Maneja cambios en el token, como login o logout
    useEffect(() => {
        localStorage.setItem('token', token);   
    },[token]);

    function logout(){
        setToken(null);
        setIsLoged(false);
        if (isAdmin === true) setIsAdmin(false);
        if (isPasajero === true) setIsPasajero(false);
    }
    return(
        <AuthContext.Provider value={{token, setToken, logout, setIsLoged, isLoged, setIsPasajero, isPasajero, setIsAdmin, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;