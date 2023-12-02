import React from 'react';
import './InstruccionesPasajero.css';
// Componente A
function InstruccionesPasajero() {
  return <div className='instrucciones-pasajero'>
        <h1 className='titulo-instrucciones'>Instrucciones Pasajero</h1>
        <p>¡Como pasajero puedes hacer muchas cosas! Entre ellas, en la página principal ubicada en "Turnos"
        podrás:
        </p>
        
        <div className='item-pasajero'>Filtrar turnos por fecha, origen y destino para encontrar el que más se acomode a tus necesitades</div>
        <div className='item-pasajero'>Ver los turnos disponibles, permitiéndote observar su chofer, sus cupos y más</div>
        <div className='item-pasajero'>Elegir el turno que quieras utilizar</div>
        
        <p>Además, en "Notificaciones" recibirás una notificación si es que:
        </p>
        
        <div className='item-pasajero'>Te han aceptado/rechazado en un turno</div>
        <div className='item-pasajero'>Tus choferes favoritos han planificado un turno</div>
        <div className='item-pasajero'>Un turno es calcelado</div>
        <div className='item-pasajero'>Un turno de tu interés ha liberado un cupo</div>

        <p>También, en "Mi Perfil" podrás: </p>     

        <div className='item-pasajero'>Ver tus datos personales y editarlos</div>
        <div className='item-pasajero'>Ver tus choferes favoritos</div>
        <div className='item-pasajero'>Ver tus estadísticas como pasajero</div>


        <p className='mensaje-final'>¡Próximamente tendremos más funcionalidades para tí!</p>
        </div>;
}

export default InstruccionesPasajero;