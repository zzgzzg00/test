/**
 * Created by zhigang.zhang on 17-9-23.
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(request);
    sendResponse('ok');
    chrome.windows.create({
        url:request[0]
    });
});