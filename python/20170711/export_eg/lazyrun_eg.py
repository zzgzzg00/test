num=0
class Test(object):
    def __init__(self):
        global num
        num+=1
        self.num=num

    def show(self):
        print(self.num)
t=None
def instance():
    global t
    if(t is None):
        t=Test()
    return t

print('use')

def test():
    class T(object):
        def show(self):
            print(self)

    def show():
        print('show')
    return T,show

if(__name__ == 'main'):
    instance()