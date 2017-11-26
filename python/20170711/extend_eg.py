class Base(object):
    def __init__(self,msg):
        self.msg=msg
    def getMsg(self):
        return self.msg

class Sub(Base):
    def __init__(self,msg1,msg2):
        self.msg2=msg2
        super().__init__(msg1)

    def getMsg(self):
        return '{0}-{1}'.format(super().getMsg(),self.msg2)

s=Sub('a','b')
print(s.getMsg());

class Test(object):
    lists=[]
    def __init__(self,sign):
        self.lists.append(self)
        self.sign=sign

class SubTest(Test):
    def show(self):
        for index,item in enumerate(self.lists,1):
            print(index,item.sign,sep='=')

t1,t2,t3=[SubTest('a'),SubTest('b'),SubTest('c')]
t3.show()


class SubTest2(Test):
    def __init__(self,sign):
        super().__init__(sign)
        self.lists=[]
    def show(self):
        print('2')
        for index,item in enumerate(self.lists,1):
            print(index,item.sign,sep='=')
t1,t2,t3=[SubTest2('a'),SubTest2('b'),SubTest2('c')]
t3.show()


