
import { geoParcel } from './components/interfaceDefinitions'
const { sqrt, abs } = Math

// don't put let or const in front of onmessage
// otherwise webworker won't work
// onmessage is a special function
onmessage = (e: MessageEvent) => {
  let { features, longitude, latitude, radiusMax, radiusMin } = e.data
  // radiusMax: get parcels inside this radius
  // radiusMin: filter pracels inside this radius
  if (features) {
    let newFeatures = features.filter(g => isParcelNear(g, longitude, latitude, radiusMax, radiusMin))
    postMessage(newFeatures)
  }
}

onerror = (e) => {
  // console.info("worker error!")
  // console.error(e)
}


export const isParcelNear = (
  geoJsonFeature: geoParcel,
  longitude: number,
  latitude: number,
  radiusMax: number,
  radiusMin: number) => {
  let lngCenter = geoJsonFeature.properties.lngCenter
  let latCenter = geoJsonFeature.properties.latCenter
  let l2Norm = sqrt((abs(lngCenter) - abs(longitude))**2 + (abs(latitude) - abs(latCenter))**2)
  return ((radiusMin || 0) <= l2Norm) && (l2Norm <= radiusMax)
}



interface MessageEvent {
  isTrusted: boolean
  data: any
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


