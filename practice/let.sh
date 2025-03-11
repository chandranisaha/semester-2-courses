#!/bin/bash
#Basic Arithmetic using Let command
echo "Basic Arithmetic using Let command"
let a=15+20
echo "a= 15+20 =" $a #35
let b=29*20
echo "b= 29*20 =" $b #580
let a++
echo "a++ =" $a #36
let "x=$1+30"
echo "x= $1+30 =" $x  #30 + first command line argument
let u=16/4
echo "u= 16/4 =" $u #4
let y=4/16
echo "y =4/16 =" $y #ceil the value to smallest number
