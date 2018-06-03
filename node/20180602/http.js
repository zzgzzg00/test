const http=require('http');
const urltools=require('url');
const path=require('path');
const pwd=path.resolve('.');
const server=http.createServer((request,response)=>{
    const {method,url}=request;
    const params=urltools.parse(url).query;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
        <html>
            <head>
                <title>response</title>
            </head>
            <body>
                ${method}-${url}-${params}-${pwd}
            </body>
        </html>
    `);
    response.end();
});
server.listen(8889);
