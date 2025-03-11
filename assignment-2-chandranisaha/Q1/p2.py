# Write Answers for part 2 here

rollno = '2024113002'

#lambda func to check if digit d is odd after converting d into int 
odd = lambda d: int(d) % 2 != 0

#extracting unique digits from rollno and filtering if they are odd
digits = list(set(filter(odd, rollno)))

#sorts list of digits in ascending order
digits = sorted(digits)

print("Odd number digits from roll number = ", digits)

