/**
 * Created by zhigang.zhang on 17-2-13.
 */
const init={
    "Content-Type":"text/javascript;charset=utf-8",
    "status" : 200 ,
    "statusText" : "SuperSmashingGreat!"
}
const _data={
    'test1':{"name":"test11"},
    'test2':{'name':'test22'}
}
const cacheName='v1',cacheList=[
    './imgs/test1.jpg',
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
});
this.addEventListener('fetch',function(events){
    let url=events.request.url;
    url=url.substring(url.lastIndexOf('/')+1);
    let data=_data[url];
    if(data){
        let blob=new Blob([JSON.stringify(data)]);
        let response=new Response(blob,init);
        events.respondWith(response);
    }
})