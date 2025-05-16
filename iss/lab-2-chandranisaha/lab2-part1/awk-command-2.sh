#!/bin/bash
awk -F, '{$1 = $1 + 10; print}' OFS=, data.csv

