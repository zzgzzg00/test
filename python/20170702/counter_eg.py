from collections import Counter
l1=['a','b','c','a','d','e','b','a']
c1=Counter(l1)
c2=Counter(l1)
print(c1.most_common(3))
print(c1+c2)