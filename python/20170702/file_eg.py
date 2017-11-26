import sys
with open('d://test.txt','r',encoding='utf-8',errors='replace') as f:
    line=(i for i in f.readlines())
it=iter(line)
print(next(it))
print(sys.getdefaultencoding())
print(sys.getfilesystemencoding())