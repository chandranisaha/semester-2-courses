# Write Answers for part 1 here

rollno = '2024113002'

#lambda func to check if digit d is prime
prime = lambda d: d in '2357'

#extracting unique digits from rollno and filtering if they are prime
digits = list(set(filter(prime, rollno)))

#sorts list of digits in ascending order
digits = sorted(digits)

print("Prime number digits from roll number = ", digits)
