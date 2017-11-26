import re
lists=['name','age']
reg=re.compile(r'(?P<{0}>[a-z]+)(?P<{1}>\d+)'.format(*lists))
result=reg.match('abc123')
print([result.group(i) for i in lists])