# Write answers for Q2 here

import os
import json
import csv

#json files are saved here
rootdir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
jsonfiles = os.path.join(rootdir, "datasets")  
output = os.path.join(rootdir, "Q2/output.csv")

#loading json files into a dictionary
dataset = {}

for filename in os.listdir(jsonfiles):
    if filename.endswith(".json"):  #make sure to process only JSON files
        filepath = os.path.join(jsonfiles, filename)
        with open(filepath, "r", encoding="utf-8") as file:
            dataset[filename] = json.load(file)

print("All JSON files have been loaded into the dictionary.") #part (a) success message

#extracting and printing keys as a list
def keysextraction(jsonobj, parentkey=""):
    """ Recursively extract all keys from nested JSON """
    keys = []
    if isinstance(jsonobj, dict):
        for key, value in jsonobj.items():
            fullkey = f"{parentkey}.{key}" if parentkey else key
            keys.append(fullkey)
            keys.extend(keysextraction(value, fullkey))
    elif isinstance(jsonobj, list):
        for item in jsonobj:
            keys.extend(keysextraction(item, parentkey)) 
    return keys

allkeys = []
for file, content in dataset.items():
    allkeys.extend(keysextraction(content))

print("All keys extracted from JSON files: ")
print(list(set(allkeys)))  #print unique keys

#json is flattened and key-value pairs are saved in csv
def flattenjson(jsonobj, parentkey=""):
    items = []
    if isinstance(jsonobj, dict):
        for key, value in jsonobj.items():
            fullkey = f"{parentkey}.{key}" if parentkey else key
            items.extend(flattenjson(value, fullkey))
    elif isinstance(jsonobj, list):
        for index, item in enumerate(jsonobj):
            items.extend(flattenjson(item, f"{parentkey}[{index}]"))
    else:
        items.append((parentkey, jsonobj))  #store key-value pair
    return items

#collecting key-value data from all JSON files
csvdata = []
for file, content in dataset.items():
    csvdata.extend(flattenjson(content))

#writing to CSV file
with open(output, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Key", "Value"])
    writer.writerows(csvdata)

print("JSON data of all keys along with their values has been saved to the output CSV file.")
