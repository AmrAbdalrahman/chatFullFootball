module.exports = function (io) {

    io.on('connection', (socket) => {

        console.log('User Connected');

        //join user to already open room
        socket.on('join', (params, callback) => {

            //join to certain room
            socket.join(params.room);

            callback();

        });

        socket.on('createMessage',(message, callback)=>{
            console.log(message);

            io.to(message.room).emit('newMessage', {
               text: message.text,
                room: message.room,
                from: message.sender
            });

            callback();

        });

    });

}