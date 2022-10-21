/**
 * This is the local server file used to send and receive data between internal components of 
 * the application. In the event of a change and rebuild, the general principal should REMAIN
 * the same. Only isolated json files, and limited editing to prevent any type of unwanted data.
 * Upon full testing I'm going to completely lock everything behind strict CORS policies for user security.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

// set our port
let port = 8000;

// notifications, notif sound, themes, emoji-hotkey

// define our app object
const app = express();

// define import app settings
app.set('json spaces', 2);
// set max parse limit to 2mb as nothing should come close to exceeding
app.use(bodyparser.json({limit: '2mb'}));
// url encoding incase i want to do param parsing
app.use(bodyparser.urlencoded({extended: true}));
// setup cors
app.use(cors());


// define a base url
let base = "/snapchat/data/";

app.get(`${base}colors`, (req, res) => {
    let theme = JSON.parse(fs.readFileSync(path.join(`${__dirname.split('scripts')[0]}/themes/theme.json`)));

    let theme_base = theme['theme'];

    let dark = theme_base['--sigMain'];
    let light = theme_base['--sigSurface'];

    let resp = {
        dark: dark,
        light: light
    };

    let all_valid = true;

    for(const [key, value] of Object.entries(resp)) {
        if(value == null || (!value && !(value == false))) all_valid = false;
    }

    resp.success = (all_valid == false) ? false : true;

    res.json(resp);
});

app.get(`${base}settings`, (req, res) => {

    // get our settings json
    let settings = JSON.parse(fs.readFileSync(path.join(`${__dirname.split('scripts')[0]}manifest.json`)));

    let resp = {
        notifs: settings.notifications,
        theme: settings.theme_on
    };

    let all_valid = true;

    // loop through the object and validate the data
    for(const [key, value] of Object.entries(resp)) {
        if(value == null || (!value && !(value == false))) all_valid = false;
    }

    resp.success = (all_valid == false) ? false : true;

    if(!resp.success) resp.message = "Couldn't validate all of the settings. Check your manifest.json file.";

    res.json(resp);
    


});

app.post(`${base}settings/update`, (req, res) => {

    let request = {
        notifs: req.body.notifs,
        theme: req.body.theme
    }

    // same logic from base/settings
    let validation = true;
    for(const [key, value] of Object.entries(request)) {
        if(value == null || (!value && !(value == false))) validation = false;
    }

    // create response object
    let success = false;

    // validate response
    success = (validation == false) ? false : true;

    if(success == false) return res.json({success: false, message: "Invalid request sent."});

    // retrieve our settings
    let settings = JSON.parse(fs.readFileSync(path.join(`${__dirname.split('scripts')[0]}manifest.json`)));

    settings.notifications = request.notifs;
    settings.notification_sound = request.notif_sounds;
    settings.emoji_hotkey = request.emoji;
    settings.theme_on = request.theme;

    fs.writeFile(path.join(`${__dirname.split('scripts')[0]}manifest.json`), JSON.stringify(settings, null, 2), (err) => {
        if(err) {
            console.log(err);
            return res.json({success: false, message: "There was an error with saving the settings. Refer to dev console."});
        }

        res.json({success: true, message: "Settings have been updated."})
    });


});


// function to start the app
const execute = () => {
    app.listen(!port ? 80 : port, () => {
        
        // we do this here in order to determine port validity. I'm doing this because I will probably make this configurable.
        console.log(`Internal component server has been started on port ${!port ? 'ERROR >> port not defined, started on default http port' : port}`);

    });
}

module.exports = {
    execute: execute
}



