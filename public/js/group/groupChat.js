$(document).ready(function () {

    //get from global io variable from top call script
    let socket = io();

    let room = $('#groupName').val();
    let sender = $('#sender').val();
    let userPic = $('#name-image').val();

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

        $(document).on('click', '#val', function () {
            $('#name').text('@' + $(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr("href","/profile/"+$(this).text());
        });

        $('#numValue').text('(' + users.length + ')');

        $('#users').html(ol);

    });

    socket.on('newMessage', function (data) {

        let template = $('#message-template').html();
        let message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
            userImage: data.image,
        });

        $('#messages').append(message);
        console.log('dddd');

    });


    $('#message-form').on('submit', function (e) {
        //to prevent load submit
        e.preventDefault();

        let msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender,
            userPic: userPic,
        }, function () {
            $('#msg').val('');
        });

        $.ajax({

            url: '/group/'+room,
            type: "POST",
            data: {
                message: msg,
                groupName: room
            },
            success: function () {
                $('#msg').val('');
            }
        })

    });

});


