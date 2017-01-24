/**
 * Created by zhigang.zhang on 17-1-24.
 */
var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
    "./imgs/test2.png",
    "./imgs/test1.jpg"
];
this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});
this.addEventListener('activate', function (event) {
    console.log('activate');
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});

this.addEventListener('fetch', function (event) {
    console.log('fetch');
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                var myBlob = new Blob();
                var init = { "status" : 200 , "statusText" : "SuperSmashingGreat!" ,"url":""};
                var myResponse = new Response(myBlob,init);
                return myResponse;
//                return res;
            }
            return requestBackend(event);
        })
    )
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }
        var response = res.clone();
        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });
        return res;
    })
}