import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

interface Location {
  lugar: string
  latitud: number
  longitud: number
}

interface Props {
  locations: Location[]
  zoom?: number
}

const mapContainerStyle = {
  width: "100%",
  height: "500px",
}

export default function GoogleMapView({ locations, zoom = 12 }: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  })

  const center = locations.length
    ? { lat: locations[0].latitud, lng: locations[0].longitud }
    : { lat: 10.47, lng: -84.64 } // Centro predeterminado (La Fortuna)

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={{ lat: loc.latitud, lng: loc.longitud }}
          title={loc.lugar}
        />
      ))}
    </GoogleMap>
  )
}