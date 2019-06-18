$(document).ready(function(){

    $('#favClubBtn').on('click', function(){
        let favClub = $('#favClub').val();

        let valid = true;

        if(favClub == ''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }

        if(valid == true){
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    favClub: favClub
                },
                success: function(){
                    $('#favClub').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200);
                }
            })
        }else {
            return false;
        }
    });


    $('#favPlayerBtn').on('click', function(){
        let favPlayer = $('#favPlayer').val();

        let valid = true;

        if(favPlayer == ''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }

        if(valid == true){
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    favPlayer: favPlayer
                },
                success: function(){
                    $('#favPlayer').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200);
                }
            })
        }else {
            return false;
        }
    });

    $('#nationalTeamBtn').on('click', function(){
        let nationalTeam = $('#nationalTeam').val();

        let valid = true;

        if(nationalTeam == ''){
            valid = false;
            $('#error').html('<div class="alert alert-danger">You cannot submit an empty field</div>');
        }else{
            $('#error').html('');
        }

        if(valid == true){
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    nationalTeam: nationalTeam
                },
                success: function(){
                    $('#nationalTeam').val('');
                    setTimeout(function(){
                        window.location.reload();
                    }, 200);
                }
            })
        }else {
            return false;
        }
    });

});