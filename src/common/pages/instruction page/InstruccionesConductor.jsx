import React from 'react';
import './InstruccionesConductor.css';
// Componente B
function InstruccionesConductor() {
  return <div className='instrucciones-conductor'>
  <h1 className='titulo-instrucciones'>Instrucciones Conductor</h1>
  <p>¡Como chofer tendrás una enorme variedad de opciones! En la página principal ubicada en "Chofer"
  podrás:
  </p>
  
  <div className='item-conductor'>Programar y crear todos los turnos que quieras</div>
  <div className='item-conductor'>Ver tus turnos</div>
  <div className='item-conductor'>Aceptar o rechazar a pasajeros</div>

  <p> En la sección de "Notificaciones" recibirás mensajes si es que:  </p>
  
  <div className='item-conductor'>Un pasajero quiere sumarse a tu turno</div>
  <div className='item-conductor'>Un pasajero se bajó de tu turno</div>
  <div className='item-conductor'>Te han calificado el turno</div>
  

  <p>Finalmente, en "Mi Perfil" podrás:</p>
    <div className='item-conductor'>Ver tus datos personales y editarlos</div>
    <div className='item-conductor'>Ver tu historial de turnos realizados</div>
    <div className='item-conductor'>Ver tus calificaciones como chofer</div>
    <div className='item-conductor'>Ver un balance de cuánto dinero has recaudado</div>
    <div className='item-conductor'>Crear autos que usarás para los turnos</div>

  <p className='mensaje-final'>¡Estas funcionalidades y muchas más estarán pronto disponibles para tí!</p>
  </div>;
}

export default InstruccionesConductor;