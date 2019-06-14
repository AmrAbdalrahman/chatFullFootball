$(document).ready(function () {
    let socket = io();

    socket.on('connect', function () {

        let room = 'GlobalRoom';

        let name = $('#name-user').val();
        let img = $('#name-image').val();

        socket.emit('global room', {
            room: room,
            name: name,
            img: img
        });

        socket.on('message display', function(){
            $('#reload').load(location.href + ' #reload');
        });
    });

    socket.on('loggedInUser', function (users) {
        let friends = $('.friend').text();
        let friend = friends.split('@');
      //  friend.shift();

        let name = $('#name-user').val().toLowerCase();
        let ol = $('<div></div>');
        let arr = [];


        for (let i = 0; i < users.length; i++) {
            if (friend.indexOf(users[i].name) > -1) {
                arr.push(users[i]);

                let userName = users[i].name.toLowerCase();

                let list = '<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px; height:50px; margin-right:10px;" /><p>' +
                    '<a id="val" href="/chat/' + userName.replace(/ /g, "-") + '.' + name.replace(/ /g, "-") + '"><h3 style="padding-top:15px;color:gray; font-size:14px;">' + '@' + users[i].name + '<span class="fa fa-circle online_friend"></span></h3></a></p>' +
                    '<div class="clearfix"></div><hr style=" margin-top: 14px; margin-bottom: 14px;" />'

                ol.append(list);
            }
        }

        $('#numOfFriends').text('(' + arr.length + ')');
        $('.onlineFriends').html(ol);

    });
});