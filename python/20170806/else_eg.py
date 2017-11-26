for i in range(1,10,2):
    if(i % 2 == 0):
        break
else:#no break
    print('ok')

try:
    2/0
except:
    print('error')
else:# no error
    print('ok')