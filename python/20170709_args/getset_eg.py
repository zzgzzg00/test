class Test(object):
    def __init__(self,name):
        self.name=name
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self,name):
        print('setter',name)
        self._name=name
    @name.deleter
    def name(self):
        del self._name

t=Test('jj')
t.name='m'
del t.name
print(t.name) #error