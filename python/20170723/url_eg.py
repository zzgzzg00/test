from urllib.request import urlopen
result=urlopen('https://touch.train.qunar.com')
print(result.read().decode())