const errorHandler = (error) => {

    // hold the base span id
    let span = "#alertSpan";
    // hold the base div id
    let div = "#alertDiv";

    // set the inner error to whatever the issue is
    $(span).text(error);

    $(div).show();
        

    setInterval(() => {
        $(div).hide();
    }, 4000);

}

const successHandler = (message) => {

    let span = "#successSpan";

    let div = "#successDiv";

    $(span).text(message);

    $(div).show();

    setInterval(() => {
        $(div).hide();
    }, 4000);

}



