//importar express
import express from 'express'
//importamos servidor http de NODE
import http from 'http'
import {Socket, Server as SocketServer} from 'socket.io'

const app = express()
//creo servidor  HTTP
const server = http.createServer(app)
//Servidor de WEBSOCKETS
const io = new SocketServer(server)

//Crear escucha de los sockets cuando pase una conexion recibes el socket
io.on('connection', Socket =>{
    console.log('Client Conected')
})

server.listen(3000)
console.log("Server on Port", 3000)
