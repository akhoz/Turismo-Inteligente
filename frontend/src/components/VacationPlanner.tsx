import { useState } from "react"
import TravelMap, { type Location } from "./TravelMap"

interface VacationPlannerProps {
  selectedModels: string[]
}

export default function VacationPlanner({ selectedModels }: VacationPlannerProps) {
  const [locations] = useState<Location[]>([
    { name: "Torre Eiffel", lat: 48.8584, lng: 2.2945, description: "Icónico monumento de París" },
    { name: "Louvre", lat: 48.8606, lng: 2.3376, description: "Museo de arte mundialmente famoso" },
    { name: "Notre-Dame", lat: 48.853, lng: 2.3499, description: "Catedral gótica histórica" },
  ])

  const messages = [
    { id: "1", role: "user", content: "Planea un viaje a París" },
    { id: "2", role: "assistant", content: "Aquí tienes un itinerario para 5 días en París 🇫🇷" },
  ]

  const input = ""
  const isLoading = false

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏖️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Planifica tu viaje perfecto</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Pregúntame sobre destinos, actividades, presupuestos o cualquier cosa relacionada con tu próximo viaje.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-3xl rounded-2xl px-4 py-3 ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.role === "assistant" && selectedModels.length > 1 && (
                  <div className="text-xs opacity-70 mt-2">
                    Respuesta combinada de {selectedModels.join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6">
          <form onSubmit={(e) => e.preventDefault()} className="flex space-x-4">
            <input
              value={input}
              onChange={() => {}}
              placeholder="Ej: Quiero viajar a París por 5 días con un presupuesto de $2000..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={selectedModels.length === 0}
            />
            <button
              type="submit"
              disabled={isLoading || selectedModels.length === 0}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              Enviar
            </button>
          </form>
          {selectedModels.length === 0 && (
            <p className="text-sm text-red-500 mt-2">Selecciona al menos un modelo de IA</p>
          )}
        </div>
      </div>

      <div className="w-96 border-l border-gray-200">
        <TravelMap locations={locations} />
      </div>
    </div>
  )
}