from functools import partial
def test(name,*args,action,**kwargs):
    print(name,args,action,kwargs.items())
#action only found by key argument keyword-only
test('jj',1,2,3,4,action='mrf',age=30,sex=2)

def expressarg(name:str,age:int)->str:
    return name+str(age)
print(expressarg('jj',30))

def defaultargs(name,*args,hover=[]):
    hover.extend(args)
    print('{name} xhb {hover}'.format(name=name,hover=hover))
defaultargs('m','mrf')
defaultargs('yn','mb')
defaultargs('jiajia','gb')

add=lambda *args:sum(args)
print(add(1,2,3,4))

#js 闭包
l1=[lambda x:x+n for n in range(1,5)]
print(l1[0](2))#6

l1=[lambda x,n=n:x+n for n in range(1,5)]
print(l1[0](2))#3

def add(a,b,c):
    return sum([a,b,c])

newAdd=partial(add,c=2)
print(newAdd(1,2))

def callbacktest(a,b,*,callback):
    result=sum([a,b])
    return callback(result)
def clouse(a):
    return lambda a,b=a:a+b
def pcallback(a,b):
    return a+b
print(callbacktest(1,2,callback=clouse(10)))
print(callbacktest(1,2,callback=partial(pcallback,10)))

def generatortest():
    result=yield 1
    yield result+1
gen=generatortest()
print(gen.send(None))
print(gen.send(5))