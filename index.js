const io = require('socket.io')(8000, {
    cors: {
        origin: "*"
    }
})


io.on("connection", (socket)=>{
    console.log(`New connection: ${socket.id}`)

    // Braodcast new user join
    
    socket.on("new_user_join", (data)=> {
        console.log(`New user joined: ${data.userName}`)

        // breadcast new user to other users
        socket.broadcast.emit("new_user_joined", data)
    })

    // Disconnect Event
     socket.on("disconnect", (data)=> {
        console.log(`Disconnected: ${socket.id}`)

        socket.broadcast.emit("user_disconnected", socket.id)
     })

     // Recieve Message
     socket.on("message_recv", (data)=> {
        //  console.log("Msg recv: ", data.msg)

        // broadcast message to other users
         socket.broadcast.emit("msg_recieved", data)
     })
})