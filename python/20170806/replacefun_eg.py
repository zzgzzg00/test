import re
def toUpper(m):
    return m.group('separte')+m.group('content').upper();
str='just a test,g jj'
reg=re.compile(r'(?P<separte>[^a-z]|^)(?P<content>[a-z])',flags=re.I)
result=reg.sub(toUpper,str);
print(result)