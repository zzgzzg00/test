class Test(object):
    def __init__(self,desc):
        self.desc=desc

    @property
    def desc(self):
        print('getter')
        return self.__desc

    @desc.setter
    def desc(self,value):
        print('setter')
        self.__desc=value

    @desc.deleter
    def desc(self):
        print('deleter')
        del self.__desc

t=Test('test')
t.desc='test2'
print(t.desc)
del t.desc
print(t.desc)
