from itertools import permutations,combinations,combinations_with_replacement,zip_longest
li=[1,2,3]
mm=[1,2]
print(list(permutations(li,2)))
print(list(combinations(li,2)))
print(list(combinations_with_replacement(li,2)))
print(list(zip_longest(li,mm)))