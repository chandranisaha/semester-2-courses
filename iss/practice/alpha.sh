#!/bin/bash
read -p "enter:" input

if [[ $input =~ ^[0-9]+$ ]]; then
echo "$input is numeric"

elif [[ "$input" =~ ^[A-Za-z]+$ ]]; then
echo $input "is numeric"

else
echo "invalid"
fi

