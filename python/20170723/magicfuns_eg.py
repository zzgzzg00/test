class Test(object):
    def __init__(self,value):
        self.value=value
    def __add__(self, other):
        return Test(self.value+other.value)
    def __ge__(self, other):
        return self.value>=other.value
    def __setitem__(self, key, value):
        print('setitem',key,value)
        setattr(self,key,value)
    def __repr__(self):
        return str(self.value)

t1,t2=Test(1),Test(2)
print(t1>=t2,t1+t2)
t1['x']=1#setitem
print(t1.x)

