
    // var CACHE_NAME = 'my-site-cache-v1';
    // var urlsToPrefetch = [
    // '/',
    // '/build/bundle.css',
    // '/build/bundle.js',
    // '/global.css',
    // 'https://webnow.mightyfag.now.sh/api/chat'
    // ];

    // self.addEventListener('install', function(event) {
    // // Perform install steps
    //     console.log("testing")
    //     event.waitUntil(
    //         caches.open(CACHE_NAME)
    //         .then(function(cache) {
    //             console.log('Opened cache');
    //             return  cache.addAll(urlsToPrefetch)
            
    //         })
    //     );
    // });

   

    // self.addEventListener('fetch', function(event) {
    //     event.respondWith(
    //         caches.open('my-site-cache-v1').then(cache=> {
    //           return fetch(event.request).then(response=> {
    //               cache.put(event.request, response.clone());
    //               return response;
    //             })
    //       // caches.match(event.request)
    //       //   .then(function(response) {
    //       //     // Cache hit - return response
    //       //       if (response) {
    //       //         console.log('Found ', event.request.url, ' in cache');
    //       //       return response;
    //       //       }

    //       //       console.log('Network request for ', event.request.url);
    //       //       return fetch(event.request).then(
    //       //           function(response) {
    //       //           // Check if we received a valid response
    //       //           if(!response || response.status !== 200 || response.type !== 'basic') {
    //       //               return response;
    //       //           }
        
    //       //           // IMPORTANT: Clone the response. A response is a stream
    //       //           // and because we want the browser to consume the response
    //       //           // as well as the cache consuming the response, we need
    //       //           // to clone it so we have two streams.
    //       //           var responseToCache = response.clone();
        
    //       //           caches.open(CACHE_NAME)
    //       //               .then(function(cache) {
    //       //               cache.put(event.request, responseToCache);
    //       //               });
        
    //       //           return response;
    //       //       })
    //       //   })
        
    // }))});


    // self.addEventListener('activate', function(event) {

    //     var cacheWhitelist = ['pages-cache-v1'];
      
    //     event.waitUntil(
    //       caches.keys().then(function(cacheNames) {
    //         return Promise.all(
    //           cacheNames.map(function(cacheName) {
    //             if (cacheWhitelist.indexOf(cacheName) === -1) {
    //               return caches.delete(cacheName);
    //             }
    //           })
    //         );
    //       })
    //     );
    //   });

