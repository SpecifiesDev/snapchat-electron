// doc on load
window.addEventListener('DOMContentLoaded', () => {

    $.ajax({
        url: "http://localhost:8000/snapchat/data/settings",
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin': 'localhost/*'
        },
        success: (res) => {

            
            // checked if it was a sucess, if not, handle error logging on the page
            if(!res.success) return errorHandler(res.message);


            // no need to validate here, as the parent request will validate it


            // set the boxes on the page to their value
            $(".notifsound").prop('checked', res.notif_sounds);
            $(".notifications").prop('checked', res.notifs);
            $(".themes").prop('checked', res.theme);
            $(".emoji").prop('checked', res.emoji);
            
        }
    })

});


