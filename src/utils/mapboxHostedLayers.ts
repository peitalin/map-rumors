

// to convert mapbox layer options to
// react-mapbox-gl layer options:
// 1) change source -> sourceId
// 2) stick all other props inside 'layerOptions'
// See react-mapbox-gl src/layers.ts
// Original layer options that work with mapbox-gl api
// start from line 100+
//
`
const example_react_mapbox_gl_code = {
  private initialize = () => {
    const { id, source } = this;
    const { type, layout, paint, layerOptions, sourceId, before } = this.props;
    const { map } = this.context;
    const layer = {
      id,
      source: sourceId || id,
      type,
      layout,
      paint,
      ...layerOptions
    };
    if (!sourceId) {
      map.addSource(id, source);
    }
    map.addLayer(layer, before);
  }
}
`

export const mapboxHostedLayers = {

    brisbaneParcels: {
      id: 'brisbane-parcels',
      type: 'line',
      // source -> sourceId
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.1rs9p367'
      },
      // paint: { 'line-opacity': 0.3, 'line-color': '#ddd' },
      paint: { 'line-opacity': 0.3, 'line-color': '#555' },
      layout: {},
      // source-layer wrapped in layerOptions
      layerOptions: {
        'source-layer': 'mapbox_graphcool_brisbane-ax7zqf',
      }
    },

    brisbaneParcelsFill: {
      id: 'brisbane-parcels-fill',
      type: 'fill',
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.1rs9p367'
      },
      paint: { 'fill-opacity': 0, 'fill-color': '#222' },
      layout: {},
      layerOptions: {
        'source-layer': 'mapbox_graphcool_brisbane-ax7zqf',
      }
    },

    brisbaneParcelsHover: {
      id: 'brisbane-parcels-hover',
      type: 'fill',
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.1rs9p367'
      },
      paint: { 'fill-opacity': 0.5, 'fill-color': '#90E0F3' },
      layout: {},
      layerOptions: {
        filter:['==', 'name', ''],
        'source-layer': 'mapbox_graphcool_brisbane-ax7zqf',
      }
    },

    brisbaneParcelsClicked: {
      id: 'brisbane-parcels-clicked',
      type: 'fill',
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.1rs9p367'
      },
      paint: { 'fill-opacity': 0.3, 'fill-color': '#75F4F4' },
      layout: {},
      layerOptions: {
        filter:['==', 'name', ''],
        'source-layer': 'mapbox_graphcool_brisbane-ax7zqf',
      }
    },

    brisbaneSuburbs: {
      id: 'brisbane-suburbs',
      type: 'line',
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.0s8uxvtf'
      },
      paint: { 'line-opacity': 0.0, 'line-color': '#F8BD7F', 'line-width': 3, 'line-blur': 2 },
      layout: {},
      // layerOptions NOT layoutOptions
      layerOptions: {
        'source-layer': 'brisbane_suburbs-9nr08i'
      }
    },

    threeDBuildings: {
      id: '3d-buildings',
      type: 'fill-extrusion',
      source: 'composite',
      paint: {
        'fill-extrusion-color': '#ddd',
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'height'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_height'
        },
        'fill-extrusion-opacity': 0.2
      },
      filter: ['==', 'extrude', 'true'],
      'source-layer': 'building',
      minzoom: 13,
    },

    traffic: {
      id: 'traffic',
      type: 'line',
      sourceId: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-traffic-v1'
      },
      paint: { 'line-color': '#FFEAD0', 'line-opacity': 0.1, 'line-width': 1 },
      layerOptions: {
        'source-layer': 'traffic',
      },
    }
};


// Original layers used with mapbox-gl api
// export const mapboxHostedLayers = {
//
//     parkinsonParcels: {
//       id: 'parkinson-parcels',
//       type: 'line',
//       source: {
//         type: 'vector',
//         url: 'mapbox://peitalin.dah4s0rb'
//       },
//       // paint: { 'line-opacity': 0.3, 'line-color': '#ddd' },
//       paint: { 'line-opacity': 0.3, 'line-color': '#555' },
//       layout: {},
//       'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
//     },
//
//     parkinsonParcelsFill: {
//       id: 'parkinson-parcels-fill',
//       type: 'fill',
//       source: {
//         type: 'vector',
//         url: 'mapbox://peitalin.dah4s0rb'
//       },
//       paint: { 'fill-opacity': 0, 'fill-color': '#222' },
//       layout: {},
//       'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
//     },
//
//     parkinsonParcelsHover: {
//       id: 'parkinson-parcels-hover',
//       type: 'fill',
//       source: {
//         type: 'vector',
//         url: 'mapbox://peitalin.dah4s0rb'
//       },
//       paint: { 'fill-opacity': 0.5, 'fill-color': '#90E0F3' },
//       layout: {},
//       filter:['==', 'name', ''],
//       'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
//     },
//
//     threeDBuildings: {
//       'id': '3d-buildings',
//       'source': 'composite',
//       'source-layer': 'building',
//       'filter': ['==', 'extrude', 'true'],
//       'type': 'fill-extrusion',
//       'minzoom': 15,
//       'paint': {
//         'fill-extrusion-color': '#aaa',
//         'fill-extrusion-height': {
//           'type': 'identity',
//           'property': 'height'
//         },
//         'fill-extrusion-base': {
//           'type': 'identity',
//           'property': 'min_height'
//         },
//         'fill-extrusion-opacity': .6
//       }
//     },
//
//     brisbaneSuburbs: {
//       id: 'brisbane-suburbs',
//       type: 'line',
//       source: {
//         type: 'vector',
//         url: 'mapbox://peitalin.0s8uxvtf'
//       },
//       paint: { 'line-opacity': 1, 'line-color': '#999', 'line-width': 2, 'line-blur': 2 },
//       'source-layer': 'brisbane_suburbs-9nr08i'
//     },
//
//     traffic: {
//       id: 'traffic',
//       type: 'line',
//       source: {
//         type: 'vector',
//         url: 'mapbox://mapbox.mapbox-traffic-v1'
//       },
//       'source-layer': 'traffic',
//       paint: { 'line-color': '#666', 'line-width': 2 }
//     }
// };
//
