/**
 * Created by root on 2/22/19.
 */
var cacheStorageKey = 'boot-shadow-3';
var cacheList=[
    '/',
    'index.html',
    'style.css',
    'demo/demo.js',
    'demo/demo-affix-03.html',
    'demo/demo-scrollspy-03.html',
    'demo/demo-table-03.html',
    'images/turkey_48px.png',
    'images/casel01.jpg',
    'images/casel02.jpg',
    'images/casel03.jpg',
    'images/casel04.jpg',
    'images/casel05.jpg'
];
self.addEventListener('install',function(e) {
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(function(cache) {cache.addAll(cacheList);})
            .then(function() {self.skipWaiting();})
    )
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response != null){
                return response
            }
            return fetch(e.request.url)

            var requestToCache = e.request.clone();
            return fetch(requestToCache).then(
                function(response){
                    if(!response || response.status !== 200){
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(cacheStorageKey)
                        .then(function(cache){
                            cache.put(requestToCache, responseToCache);
                        });
                    return response;
                }
            );
        })
    )
});
self.addEventListener('activate',function(e){
    e.waitUntil(
        //获取所有cache名称
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                // 获取所有不同于当前版本名称cache下的内容
                cacheNames.filter(function(cacheNames) {
                    return cacheNames !== cacheStorageKey
                }).map(function(cacheNames) {
                    return caches.delete(cacheNames)
                })
            )
        }).then(function() {
            return self.clients.claim()
        })
    )
});
