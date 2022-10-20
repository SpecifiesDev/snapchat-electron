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
            $(".notifsound").prop('checked', res.notif_sounds === 'true');
            $(".notifications").prop('checked', res.notifs === 'true');
            $(".themes").prop('checked', res.theme === 'true');
            $(".emoji").prop('checked', res.emoji === 'true');

        }
    })

    $("#submit").click(() => {
        
        // define a package object to update settings
        let package = {};

        // package the settings
        package.notifs = $(".notifications").prop("checked");
        package.notif_sounds = $(".notifsound").prop("checked");
        package.emoji = $(".emoji").prop("checked");
        package.theme = $(".themes").prop("checked");

        $.ajax({
            url: "http://localhost:8000/snapchat/data/settings/update",
            method: "POST",
            headers: {
                "Acesss-Control-Allow-Origin": "localhost/*"
            },
            data: package,
            dataType: "json",
            success: (res) => {
                if(!res.success) return errorHandler(res.message);

                successHandler(res.message);
            }
        })

    });

});


