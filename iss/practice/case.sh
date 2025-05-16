#!/bin/bash
clear
echo "City Type" 
echo 
read -p "Enter your City:" city
case $city in
    "Hyderabad") city_type ="Tier 2";;
    # Pipe Symbol is a OR command
    "Bengaluru" | "Mumbai") city_type="Tier 1";;
    "New Delhi") city_type= "Capital";;
    # here star is to consider anything else
    *) clear; echo "Invalid City $city"; exit;;
esac
#case in reverse to close the case statement
clear
echo "City Type for $city has been set to $city_type"
echo
