import './TurnoBusqueda.css';
import {useNavigate} from "react-router-dom"


export default function TurnoBusqueda({id, origen, destino, fecha_string, cupos_disponibles}){

    const fecha = new Date(fecha_string);
    const navigate = useNavigate();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const fechaLegible = fecha.toLocaleDateString('es-ES', opciones);
    const handleClick = (id) => {
        navigate(`/viajes/${id}`);
    }

return(
    <div className = "turno_busqueda">
        <div className= "turno_busqueda-container">
            <p> Destino:  {destino}</p>
            <p> Origen:  {origen}</p>
            <p>  {fechaLegible}</p>
            <p> Cupos disponibles:  {cupos_disponibles}</p>

            <button className="learn-more">
                <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
                </span>
                <span className="button-text" onClick={() => handleClick(id)}>Ver más</span>
            </button>

        </div>


    </div>
)

}