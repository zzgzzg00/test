obj={
    'n':'jj',
    'a':12.552
}
str1='n={n},a={a}'.format_map(obj)
print(str1)
str2='rn={n:a<20},ln={n:>20},cn={n:*^20},a={a:0.2f}'.format_map(obj)
print(str2)

str3='测试'
print(str3.encode('utf-8'))
str4=b'\xe6\xb5\x8b\xe8\xaf\x95'
print(str4.decode('utf-8'))

str5=b'a'
print(str5[0])
