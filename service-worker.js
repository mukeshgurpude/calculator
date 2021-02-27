const pagesToCache = [
    '/',
    'static/js/main.chunk.js',
    '/calculator',
    '/offline.html',
    '/404.html'
];

const cacheStorageName = 'calc-v1';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(e){
    console.debug('Yes, installed');
    e.waitUntil(
        caches.open(cacheStorageName)
        .then(cache=>{
            cache.addAll(pagesToCache);
        })
        .catch(err=>{
            console.log('An error occured: ', err)
        })
    );
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', function(e){
    // console.debug('Activated')
})


// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                // console.debug('Serving from cache', e.request.url);
                return res;
            }
            // console.debug('Pulling from server', e.request.url);
            return  fetch(e.request)
                    .then(res=>{
                        if(res.status === 404){
                            return caches.match('404.html');
                        }
                        return  caches.open(cacheStorageName)
                                .then(cache=>{
                                    cache.put(e.request, res.clone());
                                    return res;
                                })
                                .catch(err=>{
                                    console.debug('An Error occured, ', err);
                                })
                    })
        }).catch(err=>{
            return caches.match('offline.html');
        })
    )
})
