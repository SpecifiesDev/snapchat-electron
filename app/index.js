// import our necessary libs
const { app, BrowserWindow, screen, Notification, globalShortcut } = require('electron');
const { join } = require('path');
const { readFileSync } = require('fs');

// import our local data server
const server = require('./scripts/localserver');

// import our manifest
const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json')));

// store an object of our window
let window;

// keep track of windows the user is in
let notif_window = false;


// keep a placeholder for notif already sent
let notif_sent = false;

// set our app id
app.setAppUserModelId("Snapchat");

// utility function to check if a string has a number in it
const hasNumber = (str) => {
    return /\d/.test(str);
}

// this is an interval to check the screen's title every 10 seconds.
// basically, in function it will allow us to send push notifications over the user's
// system
const checkWindow = () => {

    if(window == null) return;

    let title = window.getTitle();

    // create our notification info
    let options = {
        title: 'Snapchat Message',
        body: `You've received a notification from Snapchat.`,
        icon: join(`${__dirname}/icons/icon.png`)
    }

    if(hasNumber(title)) {

        if(!(notif_sent)) {

            let notif = new Notification(options);

            notif.show();

            notif.on('click', (event, arg) => {
                window.show();
            })


            notif_sent = true;

        }

    } else {
        notif_sent = false;
    }
}


// function to create the new window with our needed parameters
const createWindow = () => {
    const win = new BrowserWindow({
        x: screen.width / 2,
        y: screen.height / 2,
        width: 1400,
        height: 800,
        webPreferences: {
            preload: join(__dirname, "/scripts/preload.js"),
            nodeIntegration: true
        }
    });

    // set the windows icon
    win.setIcon(join(`${__dirname}/icons/icon.png`));


    win.loadURL('https://web.snapchat.com/', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' 
        // here we set the user agent to "appear" as a browser
    });


    // remove the menu bar, it's ugly
    win.setMenu(null);

    // create our hotkeys
    globalShortcut.register("CommandOrControl+Shift+C", () => {
        if(!(window.isFocused())) return;
        if(!notif_window) {
            // this hotkey is used to open up settings
            win.loadFile(join(__dirname, '/pages/settings.html'));
            notif_window = true;
        } else {
            win.loadURL('https://web.snapchat.com/', {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' 
                // here we set the user agent to "appear" as a browser
            });
            notif_window = false;
        }
    });

    return win;
}


// once the app is ready, load the window
app.whenReady().then(() => {
    window = createWindow();

    // set the checkWindow interval
    if(manifest.notifications === 'true') {
        setInterval(() => {
            checkWindow()
        }, 1000);
    }

    server.execute();

});

// on app quit sent, deconstruct
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});