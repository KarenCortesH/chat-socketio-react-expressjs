//importar express
import express from 'express'
//importamos servidor http de NODE
import http from 'http'
import { Socket, Server as SocketServer } from 'socket.io'

const app = express()
//creo servidor  HTTP
const server = http.createServer(app)
//Servidor de WEBSOCKETS
const io = new SocketServer(server)

//Crear escucha de los sockets cuando pase una conexion recibes el socket
io.on('connection', socket => {
    console.log('Client connected')

    //Cuando me envien eventos me los escucha(el frontend escucha) y los imprime en consola
    socket.on('message', (data) => {
        console.log(data);
        //Vamos a enviarle n evento al frontend mensaje a todos
        socket.broadcast.emit('message', data)
    })
})

server.listen(3000)
console.log("Server on Port", 3000)
