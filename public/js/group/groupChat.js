$(document).ready(function () {

    //get from global io variable from top call script
    let socket = io();

    let room = $('#groupName').val();
    let sender = $('#sender').val();

    socket.on('connect', function () {
        console.log('Yea! User Connected');

        let params = {
            room: room,
            name: sender
        };

        //join to current club
        socket.emit('join', params, function () {
            console.log('User has joined this channel');
        });


    });

    socket.on('usersList', function (users) {

        let ol = $('<ol></ol>');

        for (let i = 0; i < users.length; i++) {

            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">' + users[i] + '</a></p>');
        }

        $('#numValue').text('('+users.length+')');

        $('#users').html(ol);

    });

    socket.on('newMessage', function (data) {

        let template = $('#message-template').html();
        let message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
        });

        $('#messages').append(message);

    });


    $('#message-form').on('submit', function (e) {
        //to prevent load submit
        e.preventDefault();

        let msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender
        }, function () {
            $('#msg').val('');
        });
    });

});


