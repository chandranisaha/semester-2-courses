# Write Answers for part 4 here

rollno = '2024113002'

#lambda func to check if digit d is even after converting d into int 
even = lambda d: int(d) % 2 == 0

#extracting unique digits from rollno and filtering if they are even
digits = list(set(filter(even, rollno)))

#sorts list of digits in ascending order
digits = sorted(digits)

print("Even number digits from roll number = ", digits)

