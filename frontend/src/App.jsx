import React, { useState } from 'react'
import { io } from 'socket.io-client'

//Aqui nos estamos comunicando con el codigo
const socket = io("/")

export default function App() {

  //Creamos un estado para llamar el mensaje
  const [message, setMessage] = useState("")

  //Creamos la funcion para manejar el envio del formulario
  const handleSubmit = (e) => {
    //evitara que refresque la pagina
    e.prevetDefault()
    console.log(message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write yor message ..."
          //Cuando el usuario cambie el valor del input, pues voy actualizar el message
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          Send
        </button>
      </form>
    </div>
  );
}
