import {setLocalStorageItem,getLocalStorageItem} from '../../storageUtil';
import md5 from '../../md5Util';
import {getServerTime,formatDate} from '../../dateTime';
import {serializeParams} from '../../utils';
import trainSuccessData from './mock/trainlist';
const request = require('request');

let timeOffset = null;
const casheKey = 'wireless.queryLeftTicket.key';
function cacheOperationType(operationTypeKey) {
    if (operationTypeKey){
        setLocalStorageItem(casheKey, operationTypeKey);
        return operationTypeKey;
    }
    return getLocalStorageItem(casheKey) || 'queryLeftTicket';
}
function getOsSpecificConfig() {
    return {
        platform: 'IOS',
        osType: 'i',
        nbappid: '60000001'
    }
}
function getTs(i) {
    var charSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '+', '/'];
    var bit = Math.pow(2, 6);
    var buf = [];
    var charPos = bit;
    var x = -1;
    do{
        charPos--;
        x = 63 & i;
        buf[charPos] = charSet[x];
        i = Math.floor(i / 64);
    } while ( i != 0 );
    var result = buf.slice(charPos, bit).join('');
    return result;
}
function getSign(requestData,ts) {
    var rqData = requestData;
    if(typeof rqData === 'object') rqData = JSON.stringify(rqData);
    var prefix = 'bea2c6393eaeb9b76b666c421f4b615f';
    var str = prefix
        + '&operationType=' + cacheOperationType()
        + '&requestData=' + rqData
        + '&ts=' + ts;
    var sign = md5(str);
    return sign;
}
function getTimeStr() {
    if(timeOffset === null){
        return getServerTime().then(timestamp=>{
            let dateObj = new Date(timestamp);
            timeOffset = Date.now() - dateObj.getTime();
            let result = {
                time_str : formatDate(dateObj, 'YYYYMMddHHMISS'),
                ts       : getTs(dateObj.getTime())
            };
            return result;
        });
    }else{
        let nowTimeObj = new Date(Date.now() - timeOffset);
        let result = {
            time_str : formatDate(nowTimeObj, 'YYYYMMddHHMISS'),
            ts       : getTs(nowTimeObj.getTime())
        };
        return Promise.resolve(result);
    }
}
function getDeviceNo() {
    let deviceNo = getLocalStorageItem('deviceNo');
    if(!deviceNo){
        deviceNo = md5(randomStr(false,24)).substr(0,24);
        setLocalStorageItem('deviceNo',deviceNo);
    }
    return deviceNo;
}
function getCheckCode(timeObj) {
    let device_no = getDeviceNo();
    let origin = 'F' + timeObj.time_str + device_no;
    let str = md5(origin);
    return str;
}
function randomStr(randomFlag, min, max){
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i = 0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
function prepareParams(obj,timeObj) {
    let requestData = JSON.stringify([{
        train_date         : obj.train_date,
        purpose_codes      : "00",
        from_station       : obj.from_station,
        to_station         : obj.to_station,
        station_train_code : "",
        start_time_begin   : "0000",
        start_time_end     : "2400",
        train_headers      : "QB#",
        train_flag         : "",
        seat_type          : "0",
        seatBack_Type      : "",
        ticket_num         : "",
        dfpStr             : "",
        baseDTO            : {
            time_str:timeObj.time_str, //"20190107201506",
            os_type:getOsSpecificConfig().osType, //"i" "a"
            mobile_no:"",
            device_no:getDeviceNo(),//"1a2167c5f459b0b98d335835",
            user_name:"",
            check_code:getCheckCode(timeObj),//"adb840105bc5247418da41004e90cbce",
            version_no:"4.0.2.3"
        }
    }]);
    const params = {
        operationType:'com.cars.otsmobile.' + cacheOperationType(),
        requestData:encodeURIComponent(requestData),
        ts:timeObj.ts,
        sign:getSign(requestData,timeObj.ts)
    };
    return params;
}
function getHeader() {
    const header = {
        'Host':'mobile.12306.cn',
        'nbappid':'60000001',
        'AppId':'9101430221728',
        'riskUdid':'E9ECAEAD-A7BD-418B-9211-58F3A8BE0CF0',
        'did':'Wi4XhheL3SgDAPndxxzxVeMC',
        'User-Agent':'MTPotal/8 CFNetwork/974.2.1 Darwin/18.0.0',
        'tk':'VCzh_JB1NYn0qWnnDUmHYfdWLUJIevRIXqgqWwziz2z0',
        'Keep-Alive':'timeout=180, max=100',
        'uuid':'f741ab90-2266-46cd-ad94-6f1262a80036',
        'installTime':'20180713233447525',
        'UniformGateway':'https://mobile.12306.cn/otsmobile/app/mds/mgw.htm',
        'WorkspaceId':'product',
        'Platform':'IOS',
        'Connection':'keep-alive',
        'Accept':'*/*',
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        'nbversion':'1.3.1.9'
    }
    return header;
}
function queryLeftTicket_leftTicketQuery_WL(obj) {
    return leftTicketQuery(obj)
        .then(res=>successAdapter(res,obj));
}
function leftTicketQuery(obj){
    return getTimeStr()
        .then(timeObj=>prepareParams(obj,timeObj))
        .then(params=>fetchMobileData(params));
}
function fetchMobileData(params) {
    return new Promise((resolve,reject)=>{
        const _params=serializeParams(params);
        const sendContent={method:'get',url:`https://mobile.12306.cn/otsmobile/app/mgs/mgw.htm?${_params}`,headers:getHeader()};
        request(sendContent,function(err,response,body){
            try{
                body=JSON.parse(body);
            }catch(e){
                reject('parse error');
            }
            if(err){
                reject(err);
            }else{
                resolve({data:body,response});
            }
        });
    });
}
function successAdapter(data = {},obj) {
    const result=data.data.result || {};
    const headers=data.response.headers;
    let {ticketResult, fallbackOperationType, error_msg} = result;
    if (checkIsEmptyArray(ticketResult) && fallbackOperationType) {
        cacheOperationType(fallbackOperationType);
        return leftTicketQuery(obj);
    } else if (error_msg) {
        return Promise.reject(error_msg);
    } else if(!ticketResult){
        return Promise.reject('empty data')
    }else {
        return Promise.resolve({result,headers});
    }
}
function checkIsEmptyArray(array){
    return !array || (array && array.length === 0);
}
export {
    queryLeftTicket_leftTicketQuery_WL as queryLeftTicket_WL
}

