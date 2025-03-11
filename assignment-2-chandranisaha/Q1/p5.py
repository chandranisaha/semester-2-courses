# Write Answers for part 5 here

rollno = '2024113002'

#lambda funcs to check divisibility
div2 = lambda d: int(d) % 2 == 0
div3 = lambda d: int(d) % 3 == 0
div4 = lambda d: int(d) % 4 == 0

#loop to count divisible digits

count2 = 0
count3 = 0
count4 = 0

for d in rollno:
    if div2(d):
        count2 += 1
    if div3(d):
        count3 += 1
    if div4(d):
        count4 += 1

#print results
print("Count of digits divisible by 2 = ", count2)
print("Count of digits divisible by 3 = ", count3)
print("Count of digits divisible by 4 = ", count4)
