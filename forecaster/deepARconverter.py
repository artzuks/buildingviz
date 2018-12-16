import csv
import json

outJSON = []
placeToIntMap = {}
cat = 0

with open('data/medianAskingRent_All.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            currCat = cat
            cat += 1
            placeToIntMap[row[0]] = currCat
            converted = list(map((lambda x: "NaN" if len(x)==0 else x), row[3:]))
            outJSON.append({"start":"2010-01-01","cat":currCat,"target":converted})
            line_count += 1
    print(f'Processed {line_count} lines.')
    print(f'{outJSON}')

with open('deepAR/medianrentprice.json', 'a+') as outfile:
    for thing in outJSON:
        outfile.write(json.dumps(thing))
        outfile.write('\n')

with open('deepAR/medianrentsmap.json', 'w') as outfile:
    json.dump(placeToIntMap, outfile)