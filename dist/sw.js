

var CACHE_NAME = 'hayek-cache';
// caches.delete('hayek-cache') // in order to purge cache
// works in browser console.
var urlsToCache = [
  '/index.html',
  '/styles.css',
  '/stylesSSR.css',
  '/vendor.js',
  '/manifest.json',
  '/bundle.js',
  '/localforage.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {

    // console.log(event.request.url);
    const url = new URL(event.request.url)

    if (url.origin == 'https://gravatar.com') {
      // implement custom handlers
      event.respondWith(handleAvatarRequest(event));
      return;
    }

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
self.addEventListener('sync', event => {
  if (event.tag == 'send-messages') {
    event.waitUntil(
      getMessagesFromOutbox().then(messages => {
        return sendMessagesToServer(messages)
          .then(() => removeMessagesFromOutbox(messages));
      })
    )
  }
})



function handleAvatarRequest(event) {
  const networkFetch = fetch(event.request);
  event.waitUntil(
    networkFetch.then(response => {
      const responseClone = response.clone();
      caches.open('avatars')
        .then(cache => cache.put(event.request, responseClone));
    })
  );

  return caches.match(event.request)
    .then(response => response || networkFetch);
}




