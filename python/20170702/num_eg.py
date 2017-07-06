n=100
str='100'
funcs=[bin,oct,hex]
types=[2,8,16]
otypes=['b','o','x']
for func,type in zip(funcs,otypes):
    print(format(n,type),func(n),sep='|')

for type in types:
    print(int(str,type))

