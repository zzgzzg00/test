from collections import _heapq
li=[{
    'name':'jj',
    'age':32
},{
    'name':'m',
    'age':30
},{
    'name':'yn',
    'age':25
},{
    'name':'cc',
    'age':22
}]
result=_heapq.nlargest(2,li,key=lambda item:-item['age'])
print(result)