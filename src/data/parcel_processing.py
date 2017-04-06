

import json
import numpy as np

######## Parcels
# ffile = "./QSCparcels_local3.json"
ffile = "./parkinson_parcels.json"
with open(ffile) as f:
    data = json.load(f)


for feature in data['features']:
    coords = feature['geometry']['coordinates'][0]
    lngCenter = np.mean([x[0] for x in coords])
    latCenter = np.mean([x[1] for x in coords])
    feature['properties']['lngCenter'] = lngCenter
    feature['properties']['latCenter'] = latCenter


with open(ffile, 'w') as f:
    f.writelines( json.dumps(data) )



#### Suburbs
with open('./brisbane_suburbs.json') as f:
    dat = json.load(f)


keys = ['LOC_PID', 'QLD_LOCA_2']
features = []
for g in dat['features']:
    newProperties = {k:v for k,v in g['properties'].items() if k in keys}
    g['properties'] = newProperties

    if g['geometry']['type'] == 'Polygon':
        coordinates = g['geometry']['coordinates']

    newCoordinates = []
    # for c in coordinates:
    for c in geometry['coordinates'][0]:
        print(c)
        lng, lat = c
        # truncate lng
        lng1, lng2 = str(lng).split('.')
        lng2 = lng2[:6]
        lng = '.'.join([lng1, lng2])
        # truncate lat
        lat1, lat2 = str(lat).split('.')
        lat2 = lat2[:6]
        lat = '.'.join([lat1, lat2])

        newCoordinates.append([float(lng), float(lat)])

    g['geometry']['coordinates'] = [newCoordinates]


with open('./brisbane_suburbs.json', 'w') as f:
    f.writelines(json.dumps(dat))



