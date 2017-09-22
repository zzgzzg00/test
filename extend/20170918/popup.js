/**
 * Created by zhigang.zhang on 17-9-18.
 */
document.querySelector('div').onclick=function(){
        fetch('https://suggest.taobao.com/sug?code=utf-8&q=kuzi&_ksTS=1505957468225_2010&callback=jsonp2011&k=1&area=c2c')
                .then(data=>data.text())
                .then(data=>document.body.insertAdjacentText('beforeend',data));
}