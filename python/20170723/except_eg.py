class OneError(Exception):
    def __init__(self,msg):
        super().__init__(msg)
        self.msg=msg
    def show(self):
        print(self.msg,1)

class TwoError(Exception):
    def __init__(self,msg):
        super().__init__(mgs)
        self.msg=msg
    def shwo(self):
        print(self.msg,2)

def errorTest(num):
    if(num == 1):
        raise OneError('one')
    elif(num == 2):
        raise TwoError('two')
    else:
        print(num)

try:
    errorTest(1)
except OneError as e:
    e.show()
except TwoError as e:
    e.show()
    raise
else:
    print('ok')
finally:
    print('finally')
    
    
