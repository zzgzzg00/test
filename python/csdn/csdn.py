obj={
    'a':1
}
def test(a=obj):
    print(obj['a'])

test()
obj['a']=2
test();