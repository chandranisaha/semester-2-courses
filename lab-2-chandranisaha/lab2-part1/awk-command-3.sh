#!/bin/bash
awk -F, '{count[$0]++} END {for (line in count) if (count[line] > 1) print line}' data.csv

