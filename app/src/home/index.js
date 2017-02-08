// Styles
require('./main.sass');

// Polyfills
require('../../../node_modules/promise-polyfill');
require('../../../node_modules/whatwg-fetch');

// Libraries
require('../../../node_modules/ionicons/dist/css/ionicons.css'); // Ionicons
require('../../../node_modules/jump.js/dist/jump'); // Smooth scrolling

// Scripts
require('./intro-animation/intro-anim');
require('./scroll');
require('./mist-init');
require('./mobile-menu');
require('./contact');
require('./map');

// Files to be copied
require('./index.pug');
require('./fonts/CharisSIL-B.ttf');
require('./fonts/charissil-b-webfont.woff');
require('./fonts/charissil-b-webfont.woff2');
