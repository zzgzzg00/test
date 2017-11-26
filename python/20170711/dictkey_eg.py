obj1={"a":1,'b':2}
obj2={"a":2,"c":3}
key1=obj1.keys()
key2=obj2.keys()
print(key1-key2,key1|key2,key1&key2)
print(obj1.pop('a'),obj1,obj1.popitem())