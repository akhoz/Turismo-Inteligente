import GoogleMapView from "./GoogleMapView"

export interface Location {
  name: string
  lat: number
  lng: number
  description: string
}

interface TravelMapProps {
  locations: Location[]
}

export default function TravelMap({ locations }: TravelMapProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Lugares Recomendados</h3>
        <p className="text-sm text-gray-500">
          {locations.length} ubicación{locations.length !== 1 ? "es" : ""} encontrada
          {locations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* MAPA: usando GoogleMapView */}
      <div className="flex-1 min-h-[200px]">
        {locations.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-green-100">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-500 text-sm">Los lugares aparecerán aquí</p>
            </div>
          </div>
        ) : (
          <GoogleMapView locations={locations} />
        )}
      </div>

      {/* Lista de ubicaciones */}
      {locations.length > 0 && (
        <div className="border-t border-gray-200 max-h-48 overflow-y-auto">
          {locations.map((location, index) => (
            <div key={index} className="p-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">{location.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{location.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}