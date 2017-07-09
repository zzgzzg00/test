class WithTest(object):
    def __init__(self):
        self.eles=[]
    def __enter__(self):
        print('enter')
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print('exit')

with WithTest() as f:
    f.eles.append('1')
    f.eles.append('2')
    print(f.eles)
