# snapchat-electron
This repository is a desktop port of Snapchat's freshly released web portal, built on top of Electron.

# installation

If you simply wish to install the application, you can go to the [latest](https://github.com/SpecifiesDev/snapchat-electron/releases/tag/beta) releases page. From here, download the latest zip folder. Now, you unzip the folder and drag it to your desktop. From here you can do one of two things. You can execute the application directly from the exe in the folder (snapchat-electron-port). This will open the app easily. Or, you can move the folder to your `C:/` or another hidden directly and create a shortcut from the same exe.

Just a side note, windows security may prevent the exe from running. This is simply because I haven't defined any app certs. If you wish to validate that the code matches what's on this repository you can navigate to `<PATH_TO_PORT>\resources\app` and cross reference the code. You can also validate the exe with a virus tool like virus total. If you still want to be extra safe, you can follow the instructions to run a fresh build.

# building

Before we get started with building, it's assumed that you have a basic knowledge of how cmd prompt works.

First, you want to have [node](https://nodejs.org/en/) installed. 
Upon completion of the download, run `npm --v`. If an error is thrown, the installation failed.

Now, you want to download the repo. Hit the green code button on this page and download the zip. Now, unzip the folder to wherever you want.

Open up a cmd and run this command to install the necessary libraries:
`cd <PATH_TO_REPOSITORY>\app && npm i && npm i electron-packager -g`

This will go through all of the required dependencies and also install our packager as a global package, allowing cli execution.

If you don't care about the icon of the app, you can just run this string without the icon parameter. If you do, just replace <PATH_TO_ICON> with the path to the icon in `icons\`

`electron-packager . snapchat-electron-port --overwrite --platform=win32 --icon=<PATH_TO_ICON>` 

This should output a folder named `snapchat-electron-port-win32-x64` in the `\app` directory.

# updates
Since I released 1.0.0 I've been working on an emoji system. I've been able to develop a method that replaces a string using configured emojis. But, with how snapchat defines the text box, I'm unable to change the cursor position without changing the core code of Snapchat's page (which I don't want to do.) Due to this, the emoji update wouldn't be streamline like I want. If people still want it, I'll post it under a separate branch.

I'm going to add a command system, allowing users to press a hotkey and execute commands that do a variety of things. One of these things is going to be to configure certain settings regarding the app. I.E notification silence, notification toggles, and maybe even core page styling (once I work out the css of the pages.)

# issues
If you run across an any bugs, open up an issue via the [issues](https://github.com/SpecifiesDev/snapchat-electron/issues) tab.
