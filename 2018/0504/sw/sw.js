const cacheName='20180504';
const cacheFiles=[
    '/',
    './index.html',
    './imgs/test.png'
]
self.addEventListener('install',function whenInstall(e){
    console.log('install');
    const cachePromise=caches.open(cacheName).then(function getCache(cache){
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cachePromise);
});
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (cache) {
            return cache || fetch(e.request);
        }).catch(function (err) {
            return fetch(e.request);
        })
    );
});