class Test1(object):
    def print1(self):
        print('test1')

class Test2(object):
    def print2(self):
        self.print1()
        print('test2')

class Test3(Test2,Test1):
    def print3(self):
        self.print2()
        print('test3')

t=Test3();
t.print3()
print(Test3.__mro__)
