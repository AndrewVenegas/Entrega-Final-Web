import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import ChoferMainPage from "./pages/chofer main page/ChoferMainPage"
import Instructions from "./pages/instruction page/Instructions"
import MiPerfil from "./pages/profile/MiPerfil.jsx"
import MyVehiclesPage from "./pages/vehicle/my-vehicles-page/MyVehiclesPage.jsx"
import NewVehiclePage from "./pages/vehicle/new-vehicle-page/NewVehiclePage.jsx"
import LandingPage from "./pages/landing-page/LandingPage"
import Login from "./pages/profile/LogInPage.jsx"
import Notificaciones from "./pages/notificaciones/Notificaciones"
import PasajeroCheck from "./pages/protected/PasajeroCheck.jsx"
import PassengerMainPage from "./pages/passenger-main-page/PassengerMainPage"
import "bootstrap/dist/css/bootstrap.min.css"
import Signup from "./pages/profile/SignUpPage.jsx"
import AdminCheck from "./pages/protected/AdminCheck.jsx"
import ChoferCheck from "./pages/protected/ChoferCheck.jsx"
import EditProfile from "./pages/profile/EditProfile/EditProfile.jsx"
import PageSolicitudChofer from "./pages/solicitud chofer/solicitud-page.jsx"
import AdminLogin from "./pages/admin/LogInAdminPage.jsx"
import MiPerfilAdmin from "./pages/admin/profile/MiPerfilAdmin.jsx"
import EditProfileAdmin from "./pages/admin/profile/EditProfile/EditProfileAdmin.jsx"
import Turnos from "./pages/Turnos"
import VehiclePage from "./pages/vehicle/vehicle-page/VehiclePage"
import EditVehiclePage from "./pages/vehicle/edit-vehicle-page/EditVehiclePage"
import DashboardSolicitudes from "./pages/admin/Dashboards/DashboardSolicitudes.jsx"
import Viaje from "./pages/viajes/Viaje.jsx"
import NotFoundPage from "./NotFoundPage.jsx"
import PruebaProtegida from "./pages/admin/Dashboards/PruebaProtegida.jsx"
import DashboardPasajeros from "./pages/admin/Dashboards/DashboardPasajeros.jsx"
import DashboardViajes from "./pages/admin/Dashboards/DashboardViajes.jsx"
import DashboardAdministradores from "./pages/admin/Dashboards/DashboardAdministradores.jsx"
import DashboardVehiculos from "./pages/admin/Dashboards/DashboardVehiculos.jsx"
import CreateNewPassenger from "./pages/admin/component/create/CreateNewPassenger.jsx"
import CreateNewAdmin from "./pages/admin/component/create/CreateNewAdmin.jsx"
import CreateSolicitud from "./pages/solicitudes/CreateSolicitud/CreateSolicitud.jsx"
import MisViajesChofer from "./pages/viajes/MisViajesChofer/MisViajesChofer.jsx"
import SolicitudesViajeChofer from "./pages/solicitudes/SolicitudesViajeChofer/SolicitudesViajeChofer.jsx"
import EditViaje from "./pages/viajes/EditViaje/EditViaje.jsx"
import MisViajesPasajero from "./pages/viajes/MisViajesPasajero.jsx"
import CreateNewViaje from "./pages/admin/component/create/CreateNewViaje.jsx"
import CreateNewVehiculo from "./pages/admin/component/create/CreateNewVehiculo.jsx"
import ChatBox from "./pages/chats/ChatBox.jsx"
// Este componente (Routing) es el que hace el enlace entre las rutas y los componentes
// Por lo tanto, hay que crear una ruta, y colocar el componente enlazado
// Main llama a Routing, routing llama a App, que solo tiene Navbar. Luego, segun la
// ruta, se llama a un componente u otro.

function Routing() {
    return (
        <>
        <BrowserRouter>
            <App />
                <div className='container'>
                    <Routes>
                    {/* Route path={"/ruta/seleccionada"} element={<nombre_componente_a_mostrar/>} */}
                        <Route path='/' element={<LandingPage/>} />
                        <Route path={"/instrucciones"} element={<Instructions />}/>  
                        <Route path='/perfil' element={<MiPerfil />} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/signup' element={<Signup/>} />
                        <Route path='/turnos' element={<Turnos />} />
                        <Route path='/notificaciones' element={<Notificaciones />} />
                        <Route path = '/pagina-principal-pasajero' element = {<PassengerMainPage/>}> </Route>
                        <Route path= '/pagina-principal-chofer' element = {<ChoferMainPage />}></Route>
                        <Route path= '/CheckPasajero' element = {<PasajeroCheck />}></Route>
                        <Route path= '/CheckAdmin' element = {<AdminCheck />}></Route>
                        <Route path= '/CheckChofer' element = {<ChoferCheck />}></Route>
                        <Route path= '/editar-perfil' element = {<EditProfile/>}/>
                        <Route path= '/solicitud-chofer' element = {<PageSolicitudChofer/>}/>

                        {/* VEHICULOS */}
                        <Route path= '/vehiculo/:id' element = {<VehiclePage />}></Route>
                        <Route path= '/mis-autos' element = {<MyVehiclesPage />}></Route>
                        <Route path= '/nuevo-auto' element = {<NewVehiclePage />}></Route>
                        <Route path= '/editar-auto/:id' element = { <EditVehiclePage />}></Route>
                        
                        {/* ADMINISTRADOR */}
                        <Route path='/login/admin' element={<AdminLogin/>} />
                        <Route path='/perfilAdmin' element={<MiPerfilAdmin/>} />
                        <Route path= '/editar-perfil-admin' element = {<EditProfileAdmin/>}/>
                        <Route path= '/Admin/Administradores' element = {<DashboardAdministradores/>}/>
                        <Route path= '/Admin/Solicitudes' element = {<DashboardSolicitudes/>}/>
                        <Route path= '/Admin/Pasajeros' element = {<DashboardPasajeros/>}/>
                        <Route path= '/Admin/Viajes' element = {<DashboardViajes/>}/>
                        <Route path= '/Admin/Vehiculos' element = {<DashboardVehiculos/>}/>
                        {/* Por implementar: */}
                        <Route path= '/admin/pasajeros/create' element = {<CreateNewPassenger/>}/>
                        <Route path= '/admin/administradores/create' element = {<CreateNewAdmin/>}/>
                        <Route path= '/admin/viajes/create' element = {<CreateNewViaje/>}/>
                        <Route path= '/admin/vehiculos/create' element = {<CreateNewVehiculo/>}/>
                        
                        {/* <Route path= '/prueba' element = {<PruebaProtegida/>}/> */}
                        {/* /DashboardSolicitudesChofer */}

                        {/* VIAJES */}
                        <Route path= '/viajes/:id' element = {<Viaje/>}></Route>
                        <Route path= '/viajes-pasajero' element = {<MisViajesPasajero/>}></Route>
                        <Route path= '/viajes/:id/update' element = {<EditViaje/>}></Route>
                        <Route path= '/viajes/:id/chat' element = {<ChatBox/>}></Route>
                        
                        <Route path= '/viajes-chofer' element = {<MisViajesChofer/>}></Route>

                        {/* SOLICITUDES */}
                        <Route path= '/viajes/:id/solicitudes/create' element = {<CreateSolicitud/>}></Route>
                        
                        <Route path= '/viajes/:id/solicitudes' element = {<SolicitudesViajeChofer/>}></Route>

                        {/* Ruta no encontrada */}
                        <Route path='*' element={<NotFoundPage/>} /> 
                    </Routes>
                </div>
        </BrowserRouter>
        </>
    )
}

export default Routing