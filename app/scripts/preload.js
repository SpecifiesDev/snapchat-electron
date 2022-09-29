const { join } = require('path');
const { readFileSync } = require('fs');
// import manifest
const manifest = JSON.parse(readFileSync(join(`${__dirname.split('scripts')[0]}manifest.json`)));

// use vanilla dom to check if content is loaded
window.addEventListener('DOMContentLoaded', () => {

    // we have to get root, if we just add the
    // color attributes by body, the theme will override them
    const root = document.querySelector(":root");

    // function to set the root's style properties
    const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]))

    if(manifest.theme_on) {
        let theme = JSON.parse(readFileSync(join(`${__dirname.split('scripts')[0]}/themes/${manifest.theme}.json`)));

        setVariables(theme.theme);
    }


});
