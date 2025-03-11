#!/bin/bash

# Prompt for user input
read -p "Enter something: " input

# Check if input is numeric
if [[ "$input" =~ ^[0-9]+$ ]]; then
    echo "$input is numeric"

# Check if input is alphabetic
elif [[ "$input" =~ ^[A-Za-z]+$ ]]; then
    echo "$input is alphabetic"

# If input is neither numeric nor alphabetic
else
    echo "Invalid input"
fi
