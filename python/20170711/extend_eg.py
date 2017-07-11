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

