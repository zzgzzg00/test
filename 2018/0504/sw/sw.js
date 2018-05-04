const cacheName='20180504';
const cacheFiles=[
    './imgs/test.png'
]
self.addEventListener('install',function whenInstall(e){
    console.log('install');
    const cachePromise=caches.open(cacheName).then(function getCache(cache){
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cachePromise);
})