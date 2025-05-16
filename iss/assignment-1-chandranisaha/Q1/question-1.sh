#!/bin/bash

#function to validate input number
validate_input()
{
    local num=$1
    #checks if input is a valid number
    if ! [[ $num =~ ^[0-9]+$ ]]; then
        echo "Invalid Input: '$num' is not a number. Please provide a numeric value."
        exit 1
    fi
    #check length
    if [ ${#num} -ne 4 ]; then
        echo "Invalid Length: Number must be exactly 4 digits. You provided a ${#num}-digit number."
        exit 1
    fi
    #check for leading zeros
    if [[ $num =~ ^0+ ]]; then
        echo "Invalid Format: Number cannot start with zeros. Please provide a number between 1000 and 9999."
        exit 1
    fi
    #check if all digits are the same
    if [ "$(echo $num | grep -o . | sort -u | wc -l)" -eq 1 ]; then
        echo "Invalid Input: All digits are the same ($num). This will result in 0000 after subtraction."
        exit 1
    fi
}

#function to perform one iteration of Kaprekar's routine
kaprekar_iteration() {
    local num=$1
    #create an array of digits, sort them in ascending and descending order
    local asc=$(echo $num | grep -o . | sort | tr -d '\n')
    local desc=$(echo $num | grep -o . | sort -nr | tr -d '\n')
    #calculate the result of the subtraction
    local result=$((10#$desc - 10#$asc))  # Use 10# to treat as decimal
    #convert result to a string to remove leading zeros
    result=$(printf "%04d" $result)
    #print the result as a 4-digit number
    echo $result
}

#main program
echo "Enter a 4-digit number:"
read input_num

#validates the input
validate_input $input_num

#initialize variables for the iteration process
current_num=$input_num
iterations=0

#starting Kaprekar's routine
while true; do
    ((iterations++))
    current_num=$(kaprekar_iteration $current_num)
    #prints iteration no and current result after every iteration
    echo "Iteration $iterations: $current_num"
    #check if the Kaprekar constant (6174) is reached
    if [ "$current_num" -eq 6174 ]; then
        echo "Total number of iterations to reach Kaprekar's constant: $iterations"
        exit 0
    fi
done
