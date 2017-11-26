class Base(object):
    def __init__(self,**keyargvs):
        self.basename=keyargvs['basename']

class LeftBase(Base):
    def __init__(self,**keyargvs):
        super().__init__(**keyargvs)
        self.leftname=keyargvs['leftname']

class RightBase(Base):
    def __init__(self,**keyargvs):
        super().__init__(**keyargvs)
        self.rightname=keyargvs['rightname']

class Test(LeftBase,RightBase):
    def __init__(self,**keyargvs):
        super().__init__(**keyargvs)
        self.name=keyargvs['name']

obj={
    'basename':'basename',
    'leftname':'leftname',
    'rightname':'rightname',
    'name':'name'
}
t=Test(**obj)
print(t.basename,t.leftname,t.rightname,t.name,sep='|')

class Base2(object):
    def __init__(self):
        print(self.xy)

class Test2(Base2):
    xy='xy'

Test2()