import { Link, useMatch, useResolvedPath , useNavigate} from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import React, { useContext, useState }  from "react";

export default function NavbarAdmin() {
    const {token, setToken} = useContext(AuthContext);
    const {isLoged, setIsLoged} = useContext(AuthContext);
    const {isPasajero, setIsPasajero} = useContext(AuthContext); 
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    // const toggleButton = () => {
    //     if (isPasajero) {
    //         if (currentPath === "/CheckChofer"){
    //             navigate("/pagina-principal-pasajero");
    //     }
    //     } else {
    //         if (currentPath=== "/pagina-principal-pasajero"){
    //         navigate("/CheckChofer");
    //     }
    //     }
    // };

    // const handleSwitchChange = () => {
    //     setIsPasajero(!isPasajero);
    //     toggleButton();
    // };

    return (
    <nav className="nav">
        {/* Aqui generaremos todos los menús */}
        {/* Los links o customlinks son los menús */}
        {/* <Link to="/" className="site-title"><img src="logo.png" /></Link> */}
        <Link to="/" className="site-title">TurnosUC</Link>
        <ul>
            <CustomLink to="/CheckAdmin">Inicio</CustomLink>
            {/* <CustomLink to="/CheckPasajero">Pasajero</CustomLink> */}
            <CustomLink to="/Admin/Administradores">Administradores</CustomLink>
            <CustomLink to="/Admin/Pasajeros">Pasajeros</CustomLink>
            <CustomLink to="/Admin/Vehiculos">Vehículos</CustomLink>
            <CustomLink to="/Admin/Viajes">Viajes</CustomLink>
            <CustomLink to="/Admin/Solicitudes">Solicitudes</CustomLink>
            <CustomLink to="/instrucciones">Instrucciones</CustomLink>
            {/* <CustomLink to="/prueba">Prueba</CustomLink> */}
            {/* <CustomLink to="/notificaciones">Notificaciones</CustomLink> */}

            {isLoged ? (
                    <CustomLink to="/perfilAdmin">Mi Perfil</CustomLink>
                    
                ) : (
                    <CustomLink to="/login">Iniciar Sesión</CustomLink>
                )}
        </ul>
        
    </nav>
    )
}

// La siguiente función es para ver si un link está activo o no (un menu)
function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to= {to} {...props}>
                {children}
            </Link>
        </li>
    )
}