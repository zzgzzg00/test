import random
li=[i**2 for i in range(1,20,3)]
print(random.random())
print(random.randint(1,10))
print(random.choice(li))
random.shuffle(li)
print(li)