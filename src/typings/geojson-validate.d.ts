


declare namespace 'geojson-validation' {
	declare var geojsonValidation: geojsonValidate
	export geojsonValidate
}

export interface geojsonValidate {
  define: Function,
  isPosition: Function,
  valid: Function,
  isGeoJSONObject: Function,
  isGeometryObject: Function,
  isPoint: Function,
  isMultiPointCoor: Function,
  isMultiPoint: Function,
  isLineStringCoor: Function,
  isLineString: Function,
  isMultiLineStringCoor: Function,
  isMultiLineString: Function,
  isPolygonCoor: Function,
  isPolygon: Function,
  isMultiPolygonCoor: Function,
  isMultiPolygon: Function,
  isGeometryCollection: Function,
  isFeature: Function,
  isFeatureCollection: Function,
  isBbox: Function,
  all_types: {
    Feature: Function,
    FeatureCollection: Function,
    Point: Function,
    MultiPoint: Function,
    LineString: Function,
    MultiLineString: Function,
    Polygon: Function,
    MultiPolygon: Function,
    GeometryCollection: Function,
    Bbox: undefined,
    Position: Function,
    GeoJSON: Function,
    GeometryObject: Function
  }
}
