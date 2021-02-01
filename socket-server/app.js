const socketIo = require('socket.io')
const express = require('express')
const http = require('http')

const port = process.env.PORT || 4001
const index = require("./routes/index")

const app = express()
app.use(index)

const server = http.createServer(app)

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log("New connection: " + socket.id)
    socket.emit("SetSocket", socket.id)
    socket.on("Join", stream => {
        io.sockets.adapter.rooms.forEach(room => socket.leave(room))
        socket.join(stream.name)
    })
    socket.on("disconnect", () => {
        console.log("Client disconnect")
    })
    socket.on("SendMessage", data => {
        socket.broadcast.to(data.stream.name).emit("ReceiveMessage", data)
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))