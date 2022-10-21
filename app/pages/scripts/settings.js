// doc on load
window.addEventListener('DOMContentLoaded', () => {


    // we have to get root, if we just add the
    // color attributes by body, the theme will override them
    const root = document.querySelector(":root");

    // function to set the root's style properties
    const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));



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
            $("#theme").prop('checked', res.theme === 'true');

            // if theme is enabled, change background color
            if($("#theme").prop("checked")) {

                $.ajax({
                    url: "http://localhost:8000/snapchat/data/colors",
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': 'localhost/*'
                    },
                    success: (res) => {
                        if(!res.success) return console.log(`Tried to get theme colors, invalid values.`);
        
                        // first, compare our deltaE values to get a "likeness rating"
                        let rating = deltaE(completeRGB(res.light), completeRGB(res.dark));

                        /**
                         * The Delta E scale in comparison to human perception is like so
                         * <= 1 Not perceptible at all, zero to no color differnece
                         * 1-2 Close observation can show a difference
                         * 2-10 A glance can show a difference
                         * 11-49 Colors are more similar than opposite
                         * 100 colors are exact opposite
                         */
                        // our sweet spot is the 11-49, in which we want to
                        // darken the top and lighten the bottom
                        if(rating >= 11 && rating <= 49) {

                            // use our shading function to darken the hex color
                            // this entire functionality is to prevent a user from
                            // being able to make their settings page look atrocious
                            // by blending colors too much.
                            //let newLight = newShade(res.light, -25);
                            let newDark = newShade(res.dark, -75);

                            let webpack = { '--mainPageTop': newDark, '--mainPageBottom': res.light }

                            setVariables(webpack);
                        } else {
                            
                            // if it's not in this range, just set to the value in the theme config
                            // may need a little manipulation depending on color ranges

                            let webpack = { '--mainPageTop': res.dark, '--mainPageBottom': res.light };

                            setVariables(webpack);

                        }

                    }
                })
            }
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



