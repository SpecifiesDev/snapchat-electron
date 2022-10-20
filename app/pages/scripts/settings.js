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
            $("#notifications").prop('checked', res.notifs === 'true');
            $("#theme").prop('checked', res.theme === 'true')

        }
    })

    $("#submit").click(() => {

        console.log($("#theme").prop('checked'));
        

        let package = {};

        // package the settings
        package.notifs = $("#notifications").prop("checked");
        package.theme = $("#theme").prop("checked");

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


