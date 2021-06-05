const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const {v4 : uuidv4} = require('uuid')

const PORT = process.env.PORT || 3000

app.set('view engine','ejs');
app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req,res)=>{
    res.render('room',{
        roomId:req.params.room
    })
})

io.on("connection", (socket)=>{
    
    socket.on('new user', (roomId, peerId, userName) => {

        console.log(roomId+" "+peerId+" "+userName)

        socket.join(roomId)
        socket.to(roomId).emit("new peer", peerId, userName)

        socket.on('disconnect', () => {
            console.log("user disconnected")
            socket.to(roomId).emit('user-disconnected', peerId)
        })

    })
})

server.listen(PORT, ()=>{
    console.log("server started at *:"+PORT)
})