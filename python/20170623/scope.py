def testfun():
    test='default'
    def inner1():
        test='inner1'
    def inner2():
        nonlocal test
        test='inner2'
    def inner3():
        global test
        test='inner3'
    inner1()
    print(test)
    inner2()
    print(test)
    inner3()
    print(test)
#testfun()
#print(test)