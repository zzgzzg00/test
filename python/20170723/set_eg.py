set1={i for i in range(1,10,2)}
set2={i for i in range(1,10,3)}
print(set1&set2,set1|set2,set1-set2,set2-set1)

li=[1,2,3,4,1]
s={i for i in li if(i%2==1)}
o={'a'+str(i):i+1 for i in li}
print(s,o)

def test(a):
    while True:
        a=yield a+1

t=test(1)
print(t.send(None))
print(t.send(2))