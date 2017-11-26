def test1():
    yield 1
    yield 2
    yield 3

def test2():
    yield from test1()
    yield from [4,5,6]

t=list(test2())
for i in t:
    print(i)
