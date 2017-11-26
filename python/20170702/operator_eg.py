from operator import itemgetter,attrgetter
class Test(object):
    def __init__(self,t1,t2):
        self.t1=t1
        self.t2=t2

    def __repr__(self):
        return '{0.t1}-{0.t2}'.format(self)

obj=[{
    'a':1,
    'b':2
},{
    'a':2,
    'b':3
},{
    'a':1,
    'b':0
}]
x=sorted(obj,key=itemgetter('a','b'))
print(x)
li=[Test(1,3),Test(2,3),Test(1,2)]
li.sort(key=attrgetter('t1','t2'))
print(li)