import React, { useState } from 'react'

// Lo siguiente es crear una función/componente que reciba un nombre y lo muestre
const UserWelcome = () => {
  const [nombre, setNombre] = useState(null)
  function cambiarEstado(nombre){
    setNombre(nombre)
  }

  return (
    <>
        <input 
        onChange={e => cambiarEstado(e.target.value)}
        placeholder='Ingresa tu nombre'/>
        <p>Bienvenid@, { nombre }!</p>
    </>
  )
}

export default UserWelcome