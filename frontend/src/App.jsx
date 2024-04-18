import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("/");

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", newMessage);
    setMessage(''); // Limpiar el input después de enviar el mensaje
  };

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className='h-screen bg-black text-white flex items-center justify-center'>
      <h2 className='text-2xl text-white font-bold'></h2>
      <form onSubmit={handleSubmit}
      className='bg-zinc-900 p-10 my-2'>
        <input
          type="text"
          placeholder="Write your message ..."
          onChange={(e) => setMessage(e.target.value)}
          className='border-2 border-zinc-500'
          value={message} // Agregado: Enlazar el valor del input con el estado 'message'
        />
      </form>
      <ul>
        {
          messages.map((message, i) => (
            <li key={i}>
              {message.from}: {message.body}
            </li>
          ))
        }
      </ul>
    </div>
  );
}
