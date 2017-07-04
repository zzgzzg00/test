from collections import namedtuple
Test=namedtuple('Test',['a','b','c','d'])
t=Test('a','b','c','d')
print(t.c)
t2=Test(*(i for i in range(1,8,2)))
print(t2.c)