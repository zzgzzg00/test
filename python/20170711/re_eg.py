import re
str='ab12-_'
reg=re.compile(r'(?P<name>[a-z]+)(?P<age>\d+)(?P<other>.*)')
result=reg.search(str)
print(result.group('name'),result.group('age'),result.group('other'))
