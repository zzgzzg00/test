import time
from threading import Thread,Event
def test(t):
    while True:
        print(t)
        time.sleep(t)
t=Thread(target=lambda :test(2))
t2=Thread(target=lambda :test(1))
# t.start()
# t2.start()

class Test(Thread):
    def __init__(self,name,time):
        super().__init__()
        self.name=name
        self.time=time

    def run(self):
        while True:
            print(self.name)
            time.sleep(self.time)

to=Test('a',1)
tp=Test('b',2)
to.start()
tp.start()