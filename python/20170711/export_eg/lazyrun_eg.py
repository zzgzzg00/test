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

if(__name__ == 'main'):
    instance()