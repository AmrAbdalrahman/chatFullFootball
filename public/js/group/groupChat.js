$(document).ready(function () {

    //get from global io variable from top call script
    var socket = io();

    socket.on('connect', function () {
        console.log('Yea! User Connected');
    });

    socket.on('newMessage', function (data) {
        console.log(data);
    });


    $('#message-form').on('submit', function (e) {
        //to prevent load submit
        e.preventDefault();

        var msg = $('#msg').val();

        socket.emit('createMessage',{
            text: msg
        });
    });

});