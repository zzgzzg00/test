import urllib
import urllib.request as reqlib
import re

class simpleException(Exception):
    def __init__(self,msg):
        Exception(self)
        self.msg = msg

def GetProvinceUrl():
    try:
        print('Getting province main page...')
        req = reqlib.urlopen('http://www.weather.com.cn/textFC/hb.shtml')
        # TODO: 解析网页编码
        resp = req.read().decode('utf-8')
        print(resp)
        req.close()
    except:
        raise(simpleException('Fail to get province info.'))
    try:
        print('Parsing province HTML...')
        prvDiv = re.search(r'''(?is)<div.*?class=["']lqcontentBoxheader["'].*?>(.*?)</div>''',resp).group(1)
        prvLi = re.findall(r'(?is)<li.*?>(.*?)</li>',prvDiv)
        # print(prvDiv, prvLi) # and NOTHING printed
        prvDict = {}
        for li in prvLi:
            # 获得超链接和名称
            info = re.search(r'''<a.*?href=['"](.*?)['"].*?>(.*?)</a>''',li)
            prvDict.setdefault(info.group(2),info.group(1))
            print(info.group(2),info.group(1))
    except:
        raise(simpleException('Fail to parse HTML about provinces.'))
    # 补全短连接
    for prv in prvDict:
        if prvDict[prv][0] == r'/':
            prvDict[prv] = r'http://www.weather.com.cn'+prvDict[prv]
        elif re.match(r'https?://*',prvDict[prv]) == None:
            prvDict[prv] = r'http://'+prvDict[prv];
    return prvDict


def GetCityCodes():
    pass

try:
    print(GetProvinceUrl())
except simpleException as e:
    print(e.msg)