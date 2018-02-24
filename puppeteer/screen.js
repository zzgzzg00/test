{
    const puppeteer=require('puppeteer');
    async function screen(){
        const browser=await puppeteer.launch({headless:true});
        const page=await browser.newPage();
        await page.goto('http://touch.train.qunar.com/trainList.html?startStation=%E5%8C%97%E4%BA%AC&endStation=%E4%B8%8A%E6%B5%B7&date=2018-02-25');
        await page.screenshot({path: './20180201/imgs/example.png'});
        // await page.pdf({path: './example.pdf', format: 'A4'});
        const info=await page.evaluate(function getInfo(){
            const v=[...document.querySelectorAll('#m-lists a')].map(function getInfo(item){
                return item.dataset.href;
            });
            return v;
        });
        await browser.close();
        return info;
    }
    screen().then(console.log);
}