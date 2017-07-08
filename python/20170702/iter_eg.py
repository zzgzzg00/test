class Test(object):
    def __init__(self,*args):
        self.elements=args

    def __iter__(self):
        return iter(self.elements)

t=Test(1,2,3,4,5)
for i in t:
    print(i)

class TestYield(object):
    def __init__(self,*args):
        self.elements=args

    def __iter__(self):
        for i in self.elements:
            yield i
t=TestYield(1,2,3,4,5)
x=iter(t)
print(next(x))

class TestMany(object):
    def __init__(self):
        self.elements=['a','b','c','d']

    def __iter__(self):
        for line,con in enumerate(self.elements,1):
            yield line,con

t=TestMany();
for num,con in t:
    print(num,con)


