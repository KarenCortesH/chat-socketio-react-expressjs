import React from 'react'
//importo SOCKET
import second from 'socket.io-client'

//Aqui vamos a comunicarnos y recibir una respuesta
const socket = io("http://localhost:3000")

function App() {
  return (
    <div>Hi World</div>
  )
}

export default  App
