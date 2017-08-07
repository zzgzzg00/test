import re
def toUpper(args):
    return args.group(0).upper();
str='just a test,g jj'
reg=re.compile(r'([^a-z]|^)([a-z])',flags=re.I)
result=reg.sub(toUpper,str);
print(result)