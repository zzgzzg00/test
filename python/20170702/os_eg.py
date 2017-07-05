import os
res=(i for i in dir(os) if not i.startswith('_'))
for i in res:
    print(i)

print(os.listdir('d://'))
