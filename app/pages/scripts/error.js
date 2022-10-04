const errorHandler = (error) => {

    // hold the base span id
    let span = "#alertSpan";
    // hold the base div id
    let div = "#alertDiv";

    // set the inner error to whatever the issue is
    $(span).text(error);

    $(div).show();
        

    //$(div).animate()

}

const popin = () => {

}

