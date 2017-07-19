import csv,pickle
def formatToDict(li):
    return {
        'name':li[0],
        li[1]:li[2],
        li[3]:li[4]
    }
def read():
    li=[]
    f=open('d://test.csv','r')
    t=csv.reader(f)
    for row in t:
        li.append(formatToDict(row))
    f.close()
    return li

def write():
    with open('d://test.txt','wb') as f:
        pickle.dump(read(),f)

def load():
    with open('d://test.txt','rb') as f:
        result=pickle.load(f)
    return result

write()
print(load())