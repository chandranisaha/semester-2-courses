#!/bin/bash

#function to generate a random 11-digit account number using RANDOM
gen_random()
{
    local num=""
    for i in {1..11}; do
        #generate a random digit (0-9) and append to account
        num+=$((RANDOM % 10))
    done
    echo $num
}

#function to generate an 11-digit account number without four consecutive zeros
gen_account_no_zeros() {
    while true; do
        local account=$(gen_random)
        if [[ ! $account =~ 0000 ]]; then
            echo $account
            return
        fi
    done
}

#function to check if a number is prime
is_prime()
{
    local num=$1
    if (( num < 2 )); then
        return 1
    fi
    for (( j=2; j*j<=num; j++ )); do
        if (( num % j == 0 )); then
            return 1
        fi
    done
    return 0
}

#function to find all two-digit prime numbers in the account number
find_primes() 
{
    local account=$1
    local primes=()

    # Extract two-digit numbers from the account number
    for ((i=0; i<=9; i++)); do
        local two_digit=${account:i:2}
        
        # Ensure that the number is a valid two-digit number (not starting with 0)
        if [[ $two_digit =~ ^[0-9]{2}$ ]] && [ "$two_digit" -ge 10 ]; then
            if is_prime $two_digit; then
                primes+=($two_digit)
            fi
        fi
    done

    # Print the primes found or a message if no primes were found
    if [ ${#primes[@]} -gt 0 ]; then
        echo "Two-digit prime numbers in the account number: ${primes[@]}"
    else
        echo "No two-digit prime numbers found in the account number."
    fi
}

#function to find all potential 5-digit numbers divisible by 7
find_div_by_7() 
{
    local account=$1
    local length=${#account}
    local divisible_by_7=()

    # Extract five-digit numbers from the account number
    for ((i=0; i<length-4; i++)); do
        local five_digit=${account:i:5}
        
        # Ensure that the number is a valid five-digit number (not starting with 0)
        if [[ $five_digit =~ ^[0-9]{5}$ ]] && [ "$five_digit" -ge 10000 ]; then
            if (( five_digit % 7 == 0 )); then
                divisible_by_7+=($five_digit)
            fi
        fi
    done

    # Print the five-digit numbers divisible by 7 or a message if no such numbers are found
    if [ ${#divisible_by_7[@]} -gt 0 ]; then
        echo "Five-digit numbers divisible by 7 in the account number: ${divisible_by_7[@]}"
    else
        echo "No five-digit numbers divisible by 7 found in the account number."
    fi
}

#main program

account=$(gen_random)
echo "Randomly generated 11-digit bank account number: $account"

account_no_zeros=$(gen_account_no_zeros)
echo "Generated account number with no 4 consecutive zeros: $account_no_zeros"

#find two-digit primes
find_primes $account

#find five-digit numbers divisible by 7
find_div_by_7 $account
