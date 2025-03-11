# Write Answers for part 4 here

rollno = '2024113002'

#lambda func to check if digit is zero
zero = lambda d: d == '0'

#count number of zeros
count = 0
for d in rollno:
	count += zero(d)

print("Count of zeros in roll number = ", count)
