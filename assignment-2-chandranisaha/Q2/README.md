## Follow the File Structure and add Assumptions in this Readme file

ASSUMPTIONS:

a)the json fileshave been manually downloaded and stored inside a datasets/ folder in the root directory
The datasets/ folder is not included in the git repo by adding it's path in .gitignore
It is assumed that dataasets/ contains only .json files

b)Absolute paths are used so as to make sure q2.py can be executed both in root directory and inside the Q2 folder
The script dynamically finds the root directory using os.path.abspath() to avoid path issues.

c)All keys from the JSON files (including parent, child, and nested keys) are extracted and printed to the terminal.
The script flattens the JSON structure to store key-value pairs in CSV format.
The CSV file will have two columns: "Key" and "Value".



