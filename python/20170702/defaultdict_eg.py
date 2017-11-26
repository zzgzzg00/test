from collections import defaultdict
class Test(object):
    def __init__(self):
        self.list=[]

    def add(self,value):
        self.list.append(value)

    def adds(self,list):
        self.list.extend(list)

map=defaultdict(Test)
map['a'].adds([1,2,3])
print(map['a'].list)