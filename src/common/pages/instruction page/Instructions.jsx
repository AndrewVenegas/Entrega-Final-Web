import React, { useState } from 'react'; 
import './Instructions.css'
import InstruccionesPasajero from "./InstruccionesPasajero";
import InstruccionesConductor from "./InstruccionesConductor";


function Instructions () {
    const [showComponentA, setShowComponentA] = useState(true);
    const [showComponentB, setShowComponentB] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const toggleComponent = (component) => {
      if (isAnimating) return; // Evita cambios durante la animación
  
      setIsAnimating(true);
  
      if (component === 'A') {
        setShowComponentB(false);
        setTimeout(() => {
          setShowComponentA(true);
          setIsAnimating(false);
        }, 1); // 1ms para completar la animación de barrido
      } else {
        setShowComponentA(false);
        setTimeout(() => {
          setShowComponentB(true);
          setIsAnimating(false);
        }, 1); // 1ms para completar la animación de barrido
      }
    };
    return (
        <>
        <div id='contenedor-botones1'>
          <button
              className={`boton-custom ${showComponentA ? 'disabled-button' : ''}`}
              onClick={() => toggleComponent('A')}
              disabled={showComponentA}
          >
              Pasajero
          </button>
          <button
              className={`boton-custom ${showComponentB ? 'disabled-button' : ''}`}
              onClick={() => toggleComponent('B')}
              disabled={showComponentB}
          >
              Chofer
          </button>
        </div>
          <div className={`transition ${showComponentA ? 'slide-in' : 'slide-out'}`}>
            {showComponentA && <InstruccionesPasajero />}
          </div>
          <div className={`transition ${showComponentB ? 'slide-in' : 'slide-out'}`}>
            {showComponentB && <InstruccionesConductor />}
          </div>
        
        </>
      );
    }
export default Instructions