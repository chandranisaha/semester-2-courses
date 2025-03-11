#!/bin/bash

declare -l str="hello"
echo ${str-"test passed"}

echo ${#str}

echo ${str#*e}
