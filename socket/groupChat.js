module.exports = function (io, Users) {

    const users = new Users();
    io.on('connection', (socket) => {

        console.log('User Connected');

        //join user to already open room
        socket.on('join', (params, callback) => {

            users.AddUserData(socket.id, params.name, params.room);

            //send parameter with full room data
            io.to(params.room).emit('usersList', users.GetUsersList(params.room));

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