from export_eg import instance,test
t=instance()
t.show()

a=instance()
a.show()

print(t is a)

T,show=test()
t=T();
t.show()
show()
