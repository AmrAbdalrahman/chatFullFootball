$(document).ready(function () {
    let socket = io();

    let room = $('#groupName').val();
    let sender = $('#sender').val();


    socket.on('connect', function () {
        let params = {
            sender: sender,
        };

        socket.emit('joinRequest', params, function () {
            console.log('Joined');
        });
    });

    socket.on('newFriendRequest', function (friend) {
        $('#reload').load(location.href + ' #reload');

        $(document).on('click','#accept_friend', function () {
            let senderId = $('#senderId').val();
            let senderName = $('#senderName').val();

            $.ajax({
                url: '/group/' + room,
                type: 'POST',
                data: {
                    senderId: senderId,
                    senderName: senderName
                },
                success: function () {
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });

        $(document).on('click','#cancel_friend' ,function () {
            let user_Id = $('#user_Id').val();

            $.ajax({
                url: '/group/' + room,
                type: 'POST',
                data: {
                    user_Id: user_Id
                },
                success: function () {
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });
    });

    $('#add_friend').on('submit', function (e) {
        e.preventDefault();

        let receiveName = $('#receiverName').val();

        $.ajax({
            url: '/group/' + room,
            type: 'POST',
            data: {
                receiveName: receiveName,
            },
            success: function () {
                socket.emit('friendRequest', {
                    receiver: receiveName,
                    sender: sender
                }, function () {
                    console.log('Request Sent');
                })
            }
        })
    });

    $('#accept_friend').on('click', function () {
        let senderId = $('#senderId').val();
        let senderName = $('#senderName').val();

        $.ajax({
            url: '/group/' + room,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function () {
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });

    $('#cancel_friend').on('click', function () {
        let user_Id = $('#user_Id').val();

        $.ajax({
            url: '/group/' + room,
            type: 'POST',
            data: {
                user_Id: user_Id
            },
            success: function () {
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });


});