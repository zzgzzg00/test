/**
 * Created by zhigang.zhang on 17-2-13.
 */
const init={
    "Content-Type":"text/javascript;charset=utf-8",
    "status" : 200 ,
    "statusText" : "SuperSmashingGreat!"
}
const _data={
    'test1':{"name":"test_1"},
    'test2':{'name':'test_2'}
}
const cacheName='v1',cacheList=[
    './imgs/test2.png',
    '/test.html'
];
this.addEventListener('install',function(e){
    console.log('install');
    e.waitUntil(
        caches.open(cacheName).then(cache=>cache.addAll(cacheList))
    )
});
this.addEventListener('activate',function(e){
    console.log('active');
    e.waitUntil(
        caches.keys().then(
            keys=>Promise.all(
                keys.map(item=>item!=cacheName?
                    caches.delete(item):item
                )
            )
        )
    );
});
this.addEventListener('fetch',function(events){
    let url=events.request.url;
    url=url.substring(url.lastIndexOf('/')+1);
    let data=_data[url];
    if(data){
        let blob=new Blob([JSON.stringify(data)]);
        let response=new Response(blob,init);
        events.respondWith(response);
    }else{
        events.respondWith(
            caches.match(events.request).then(response=>response);
        )
    }
})