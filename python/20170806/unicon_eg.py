import unicodedata
def getValues(val):
    name=unicodedata.name(val)
    print(name)
    return unicodedata.lookup(name)

print(getValues('\u4e00'))