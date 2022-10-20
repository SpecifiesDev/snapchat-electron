const errorHandler = (error) => {

    // hold the base span id
    let alert = ".alert-error";
    // hold the base div id
    let alertText = ".alert-value";

    // set the inner error to whatever the issue is
    $(alertText).text(`ERROR! ${error}`);

    $(alert).show();
        



}

const successHandler = (message) => {

    let alert = ".alert-success";
    let alertText = ".alert-value";

    $(alertText).text(`Success! ${message}`);


    $(alert).show();


}



