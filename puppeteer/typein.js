{
    const puppeteer=require('puppeteer');
    const devices = require('puppeteer/DeviceDescriptors');
    const iPhone = devices['iPhone 6'];
    async function run(){
        const browser=await puppeteer.launch({
            headless:true,
            devtools:true
        });
        const page=await browser.newPage();
        await page.emulate(iPhone);
        await page.goto('http://touch.train.qunar.com');
        await page.evaluate(function getInfo(){
            document.querySelector('[node-type="endStation"]').value='大同';
        });
        await page.tap('[action-type="stationQuery"]');
        await (function whenload(){
            return new Promise(function(resolve){
                page.on('load',function(){
                    resolve(page);
                });
            })
        })();
        const info=await page.evaluate(function getInfo(){
            const v=[...document.querySelectorAll('#m-lists a')].map(function getInfo(item){
                return item.dataset.href;
            });
            return v;
        });
        await browser.close();
        return info;
    }
    run()
        .then(console.log)
        .catch(console.log.bind(console,'errors'));
}