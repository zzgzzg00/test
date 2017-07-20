import re;
str='a;bc;d;'
reg=re.compile(r';')
print(reg.split(str))
