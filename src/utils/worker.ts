
import { geoParcel, LngLat } from '../typings/interfaceDefinitions'
const { sqrt, abs } = Math

// don't put let or const in front of onmessage
// otherwise webworker won't work
// onmessage is a special function
onmessage = (e: MessageEvent) => {
  let { features, longitude, latitude, radiusMax, radiusMin } = e.data
  // radiusMax: get parcels inside this radius
  // radiusMin: filter pracels inside this radius
  if (features) {
    // can't pass immutable objects into web workers. not serializable.
    let newFeatures = features.filter(g => isParcelNear(g, longitude, latitude, radiusMax, radiusMin))
    postMessage(newFeatures)
  }
}

onerror = (e) => {
  // console.info("worker error!")
  // console.error(e)
}


// export const isParcelNear = (
//   geoJsonFeature: geoParcel,
//   longitude: number,
//   latitude: number,
//   radiusMax: number,
//   radiusMin: number) => {
//   let lngCenter = geoJsonFeature.properties.lngCenter
//   let latCenter = geoJsonFeature.properties.latCenter
//   return (abs(abs(lngCenter) - abs(longitude)) < 0.002) && (abs(abs(latCenter) - abs(latitude)) < 0.002)
// }

export const L2Norm = (
  { lng, lat }: { lng: number, lat: number  },
  { lngCenter, latCenter }: { lngCenter: number, latCenter: number }
  ): number => {
  // calculates the L2 Norm for 2 geolocations
  return sqrt((abs(lngCenter) - abs(lng))**2 + (abs(lat) - abs(latCenter))**2)
}

export const isParcelNear = (
    geoJsonFeature: geoParcel,
    longitude: number,
    latitude: number,
    radiusMax: number,
    radiusMin: number
  ) => {
  let { lngCenter, latCenter } = geoJsonFeature.properties
  let L2Distance = L2Norm({ lng: longitude, lat: latitude }, { lngCenter: lngCenter, latCenter: latCenter })
  return ((radiusMin || 0) <= L2Distance) && (L2Distance <= radiusMax)
}


interface MessageEvent {
  isTrusted: boolean
  data: Object
  origin: string
  lastEventId: string
  source: any
  currentTarget: Object
  defaultPrevented: boolean
  path: Array
  ports: Array
  returnValue: boolean
  type: string
}


