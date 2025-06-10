import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { type Location } from "./TravelMap"

interface GoogleMapViewProps {
  locations: Location[]
}

const containerStyle = {
  width: "100%",
  height: "100%",
}

const centerDefault = {
  lat: 10.0,
  lng: -84.0,
}

export default function GoogleMapView({ locations }: GoogleMapViewProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  })

  const center = locations.length > 0 ? { lat: locations[0].lat, lng: locations[0].lng } : centerDefault

  if (!isLoaded) return <div className="flex items-center justify-center h-full">Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={locations.length > 1 ? 10 : 13}
    >
      {locations.map((loc, index) => (
        <MarkerF
          key={index}
          position={{ lat: loc.lat, lng: loc.lng }}
          label={{ text: `${index + 1}`, className: "text-xs font-bold", color: "white" }}
          title={loc.name}
        />
      ))}
    </GoogleMap>
  )
}