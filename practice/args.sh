#!/bin/bash
echo 
if  test  "$1" = "" 
    then 
        echo "No first value supplied"
        exit
fi
if  test  "$2" = ""
    then
        echo "No second value supplied"
        exit
fi
clear
echo
echo "Sum of  values:" $1+$2=$(($1+$2))

echo $*

echo $?
