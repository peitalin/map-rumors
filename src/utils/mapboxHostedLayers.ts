
export const mapboxHostedLayers = {
    parkinsonParcels: {
      id: 'parkinson-parcels',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://peitalin.dah4s0rb'
      },
      paint: { 'line-opacity': 1, 'line-color': '#222' },
      'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
    },

    parkinsonParcelsFill: {
      id: 'parkinson-parcels-fill',
      type: 'fill',
      source: {
        type: 'vector',
        url: 'mapbox://peitalin.dah4s0rb'
      },
      paint: { 'fill-opacity': 0, 'fill-color': '#222' },
      'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
    },

    threeDBuildings: {
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'height'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_height'
        },
        'fill-extrusion-opacity': .6
      }
    },

    brisbaneSuburbs: {
      id: 'brisbane-suburbs',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://peitalin.0s8uxvtf'
      },
      paint: { 'line-opacity': 1, 'line-color': '#999', 'line-width': 2, 'line-blur': 2 },
      'source-layer': 'brisbane_suburbs-9nr08i'
    },

    traffic: {
      id: 'traffic',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-traffic-v1'
      },
      'source-layer': 'traffic',
      paint: { 'line-color': '#666', 'line-width': 2 }
    }
};

