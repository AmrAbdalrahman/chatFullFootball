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
    });

    $('#add_friend').on('submit', function (e) {
        e.preventDefault();

        let receiveName = $('#receiverName').val();

        $.ajax({
            url: '/group/'+room,
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


});