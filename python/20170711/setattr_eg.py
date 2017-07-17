class Test(object):
    def __init__(self,*args):
        for index,item in enumerate(args,1):
            setattr(self,item,index)

t=Test('a','b','c')
print(vars(t))
print(getattr(t,'c'))

class Test2(Test):
    def show(self):
        print(vars(self))

t=Test2('a','b','d')
t.show();