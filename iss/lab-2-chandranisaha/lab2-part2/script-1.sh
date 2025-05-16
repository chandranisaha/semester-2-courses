#!/bin/bash

# Read input from script.txt, filter words starting with 's' but not 'sa'
# Get unique words and store in filtered_words
filtered_words=$(grep -o '\<s[^a][a-z]*\>' script.txt | sort -u)

# Initialize an array to store character frequencies
declare -A freq

# Calculate frequency of each character in filtered words
for word in $filtered_words; do
    # Split word into characters and count frequencies
    for ((i=0; i<${#word}; i++)); do
        char="${word:$i:1}"
        ((freq[$char]++))
    done
done

# Generate the flag
flag="CTF{"
# Iterate through alphabet (a-z)
for ((i=97; i<=122; i++)); do
    char=$(printf \\$(printf '%03o' $i))
    count=${freq[$char]:-0}  # Get count, default to 0 if character not found
    
    # Map frequency to letter by adding ASCII value of 'a'
    mapped_ascii=$((97 + count))
    mapped_char=$(printf \\$(printf '%03o' $mapped_ascii))
    flag+="$mapped_char"
done
flag+="}"

echo "$flag" > flag-1.txt
