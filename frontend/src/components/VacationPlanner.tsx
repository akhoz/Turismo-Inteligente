import { useState } from "react"
import TravelMap, { type Location } from "./TravelMap"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useToast } from "../contexts/ToastProvider"

interface VacationPlannerProps {
  selectedModels: string[]
}

interface AIParsedResponse {
  mensaje: string
  localizaciones: {
    lugar: string
    latitud: number
    longitud: number
  }[]
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const modelNameMap: Record<string, string> = {
  openai: "ChatGPT",
  gemini: "Gemini",
  claude: "Claude",
}


export default function VacationPlanner({ selectedModels }: VacationPlannerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || selectedModels.length === 0) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    }

    setMessages([userMessage])
    setIsLoading(true)

    const newResponses: Record<string, string> = {}
    const allLocations: Location[] = []
    const seenLocations = new Set<string>()

    for (const model of selectedModels) {
      try {
        const url = `http://127.0.0.1:8000/api/${model}/parsed`
        const res = await axios.post<AIParsedResponse>(url, { prompt: input })

        newResponses[model] = res.data.mensaje

        for (const l of res.data.localizaciones) {
          const key = `${l.lugar}-${l.latitud.toFixed(4)}-${l.longitud.toFixed(4)}`
          if (!seenLocations.has(key)) {
            seenLocations.add(key)
            allLocations.push({
              name: l.lugar,
              lat: l.latitud,
              lng: -Math.abs(l.longitud),
              description: l.lugar,
            })
          }
        }
      } catch (err) {
          console.error(`Error al obtener respuesta de ${model}:`, err)
          addToast({
            type: "error",
            title: `Error con ${model}`,
            message: "Ocurrió un problema al obtener la respuesta.",
          })
      }
    }

    if (Object.keys(newResponses).length > 0) {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }

    setResponses(newResponses)
    setActiveTab(Object.keys(newResponses)[0] || null)
    setLocations(allLocations)
    setIsLoading(false)
    setInput("")
  }

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
                className={`w-2/3 rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {message.role === "assistant" && Object.keys(responses).length > 0 ? (
                  <>
                    <div className="flex space-x-2 mb-3">
                      {Object.keys(responses).map((model) => (
                        <button
                          key={model}
                          onClick={() => setActiveTab(model)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                            activeTab === model
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {modelNameMap[model] ?? model}
                        </button>
                      ))}
                    </div>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                        h2: ({ ...props }) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                        h3: ({ ...props }) => <h3 className="text-lg font-medium mt-4 mb-2 text-blue-800" {...props} />,
                        p: ({ ...props }) => <p className="text-sm text-gray-700 mb-2" {...props} />,
                        li: ({ ...props }) => <li className="ml-4 list-disc text-sm text-gray-700" {...props} />,
                      }}
                    >
                      {activeTab ? responses[activeTab] : ""}
                    </ReactMarkdown>
                  </>
                ) : (
                  <p className="whitespace-pre-wrap text-white text-sm">{message.content}</p>
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
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Quiero viajar a La Fortuna por 7 días..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading || selectedModels.length === 0}
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

      <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-200">
        <TravelMap locations={locations} />
      </div>
    </div>
  )
}