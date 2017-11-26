import re
str='just "a" "test"'
reg=re.compile(r'"(.*?)"',flags=re.I)
result=reg.search(str)
print(result.group(0),result.group(1),sep='|')
result=reg.findall(str)
print(result)
result=reg.sub(r'\1',str)
print(result)

def test(arg):
    return arg.group(1)+'0'

result=reg.sub(test,str)
print(result)