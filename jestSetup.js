window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

// window.localStorage.getItem

// window.localStorage.getItem = function(authtoken) {
// 	return null
//   if (authtoken) {
//     return authtoken
//   } else {
//     return null
//   }
// }

// import {jsdom} from 'jsdom';
//
// const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
// global.document = jsdom(documentHTML);
// global.window = document.parentWindow;
//
// global.window.resizeTo = (width, height) => {
//   global.window.innerWidth = width || global.window.innerWidth;
//   global.window.innerHeight = width || global.window.innerHeight;
//   global.window.dispatchEvent(new Event('resize'));
// };
