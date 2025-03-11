#!/bin/bash
awk -F, '{sum1+=$1; sum2+=$2; sum3+=$3; count++} END {avg1=sum1/count; avg2=sum2/count; avg3=sum3/count; print "Max Avg: ", (avg1 > avg2 ? (avg1 > avg3 ? avg1 : avg3) : (avg2 > avg3 ? avg2 : avg3))}' data.csv

