

var CACHE_NAME = 'hayek-cache';
// caches.delete('hayek-cache') // in order to purge cache
// works in browser console.
var urlsToCache = [
  '/index.html',
  '/styles.css',
  '/overrides.css',
  // '/stylesSSR.css',
  '/vendor.js',
  '/manifest.json',
  '/bundle.js',
  '/localforage.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js',
];


// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that page
self.addEventListener('fetch', (event) => {

  // console.log(event.request.url);
  const url = new URL(event.request.url)

  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  if (url.origin == location.origin && url.pathname == '/') {
    event.respondWith(caches.match('/index.html'))
    return;
  }

  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );

});

///// background sync
// self.addEventListener('sync', event => {
//   if (event.tag == 'send-messages') {
//     event.waitUntil(
//       getMessagesFromOutbox().then(messages => {
//         return sendMessagesToServer(messages)
//           .then(() => removeMessagesFromOutbox(messages));
//       })
//     )
//   }
// })





