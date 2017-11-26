def log(func):
    def inner(*agrs,**kwargs):
        print('log')
        return func(*agrs,**kwargs)
    return inner

@log
def test(a,b,c):
    print(a,b,c,sep='|')
    return sum([a,b,c])

print(test(1,2,3))

def arglog(str):
    def log(func):
        def inner(*args,**kwargs):
            print('arglog-{0}'.format(str))
            return func(*args,**kwargs)
        return inner
    return log

@arglog('test')
def test2(a,b,c):
    print(a,b,c,sep='|')
    return sum([a,b,c])
print(test2(1,2,3))
