$(document).ready(function () {


    $('#favourite').on('submit', function (e) {

        e.preventDefault();

        let id = $('#id').val();
        let clubName = $('#club_Name').val();

        $.ajax({
            url: '/home',
            type: 'POST',
            data: {
                id: id,
                clubName: clubName
            },
            success: function () {
                console.log(clubName);
            }
        })
    });


});