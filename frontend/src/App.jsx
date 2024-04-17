import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("/");

export default function App() {
  const [message, setMessage] = useState('');
  //arreglo vacio para tener mensajes 
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Corregido el error de ortografía
    console.log(message);
    socket.emit('message', message); // Enviar el mensaje al servidor de socket
    setMessage(''); // Limpiar el input después de enviar el mensaje
  };
  //Va escuchar cuando cargue la aplicacion por eventos de socket
  useEffect(() => {
    // Corregido el callback para que maneje el mensaje recibido
    socket.on('message', message => {
      console.log("Mensaje recibido:", message)
      setMessages([...messages, message]);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message ..."
          onChange={(e) => setMessage(e.target.value)}
          value={message} // Enlazar el valor del input con el estado 'message'
        />
        <button type="submit">Send</button> {/* Cambiado a type="submit" para que el botón envíe el formulario */}
      </form>
      <ul>
        {messages.map(message => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
}
