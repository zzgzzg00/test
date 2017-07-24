obj={
    'a':'aBc',
    'b':'aBc'
}
obj.update({
    'a':obj['a'].lower(),
    'b':obj['b'].upper(),
    'c':'c'
})
print(obj)

printa=lambda : print('a')
printb=lambda :print('b')
obj2={
    (1,2,3):printa,
    (4,5,6):printb
}
obj2[(4,5,6)]()

obj3=dict(a=1,b=2,c=3)
print(obj3)