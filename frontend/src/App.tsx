import { useState } from "react"
import { Spinner } from "flowbite-react"
import ModelSelector from "./components/ModelSelector"
import ResponseTabs from "./components/ResponseTabs"
import { vacationsPrompt, entrepreneurshipPrompt } from "./utils/prompt"
import axios from "axios"
import GoogleMapView from "./components/GoogleMapView"

interface Model {
  id: string
  name: string
  endpoint: string
  color: string
}

interface Location {
  lugar: string
  latitud: number
  longitud: number
}

interface AIResponse {
  model: string
  color: string
  response: string | { mensaje: string; localizaciones: Location[] }
  timestamp: string
}

const models: Model[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    endpoint: import.meta.env.VITE_OPENAI_URL,
    color: "bg-green-500",
  },
  {
    id: "gemini",
    name: "Gemini",
    endpoint: import.meta.env.VITE_GEMINI_URL,
    color: "bg-blue-500",
  },
  {
    id: "claude",
    name: "Claude",
    endpoint: import.meta.env.VITE_CLAUDE_URL,
    color: "bg-purple-500",
  },
]

export default function App() {
  const [prompt, setPrompt] = useState(vacationsPrompt)
  const [selectedModels, setSelectedModels] = useState<Model[]>([models[0]])
  const [responses, setResponses] = useState<Record<string, AIResponse>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [analysisType, setAnalysisType] = useState<"vacaciones" | "emprendimientos">("vacaciones")

  const defaultPrompts = {
    vacaciones: vacationsPrompt,
    emprendimientos: entrepreneurshipPrompt,
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!prompt.trim()) return setError("Please enter a prompt")
    if (selectedModels.length === 0) return setError("Please select at least one AI model")

    setLoading(true)
    setError("")
    await new Promise((res) => setTimeout(res, 0))

    try {
      const combinedPrompt = `Context: ${analysisType}\n\nUser Request: ${prompt}`

      const results = await Promise.all(
        selectedModels.map(async (model) => {
          const response = await sendToModel(model, combinedPrompt)
          return {
            modelId: model.id,
            modelName: model.name,
            modelColor: model.color,
            response,
            timestamp: new Date().toLocaleTimeString(),
          }
        })
      )

      const newResponses: Record<string, AIResponse> = {}
      results.forEach((res) => {
        newResponses[res.modelId] = {
          model: res.modelName,
          color: res.modelColor,
          response: res.response,
          timestamp: res.timestamp,
        }
      })

      setResponses(newResponses)
    } catch (err: unknown) {
      setError(err instanceof Error ? `Error: ${err.message}` : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const sendToModel = async (model: Model, promptText: string): Promise<string | { mensaje: string; localizaciones: Location[] }> => {
    const finalEndpoint =
      analysisType === "vacaciones" ? `${model.endpoint}/parsed` : model.endpoint

    const res = await axios.post(finalEndpoint, { prompt: promptText }, {
      headers: { "Content-Type": "application/json" },
    })

    if (analysisType === "vacaciones") {
      console.log(res.data.localizaciones || [])
    }

    return analysisType === "vacaciones"
      ? { mensaje: res.data.mensaje, localizaciones: res.data.localizaciones || [] }
      : res.data.results || res.data.mensaje || JSON.stringify(res.data, null, 2)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Turismo Inteligente</h1>
          <p className="text-lg text-gray-600">Planea vacaciones o descubre nuevos empredimientos de forma inteligente</p>
        </header>

        <main className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-start items-center space-x-2 mb-2">
            {(["vacaciones", "emprendimientos"] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setAnalysisType(type)
                  setPrompt(defaultPrompts[type])
                }}
                className={`px-4 py-2 rounded-lg font-semibold border transition ${analysisType === type ? "bg-accent text-black border-accent" : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">Tu prompt</label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                rows={12}
                placeholder="Describe tu necesidad..."
              />
            </div>

            <ModelSelector models={models} selectedModels={selectedModels} onModelsChange={setSelectedModels} />

            {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded p-3 text-sm">{error}</p>}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading || selectedModels.length === 0}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-colors duration-200 ${loading || selectedModels.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-accent text-black hover:bg-accent/90"}`}
              >
                {loading ? (<><Spinner className="mr-2 w-5 h-5" />Procesando...</>) : `Analizar con ${selectedModels.length} modelo${selectedModels.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </form>
        </main>

        {Object.keys(responses).length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Model Responses</h2>
            <ResponseTabs
              responses={Object.fromEntries(
                Object.entries(responses).map(([key, r]) => [key, {
                  ...r,
                  response: typeof r.response === 'string' ? r.response : r.response.mensaje
                }])
              )}
            />

            {analysisType === "vacaciones" && Object.values(responses).some((r) =>
              typeof r.response !== "string" && Array.isArray((r.response as any).localizaciones)
            ) && (
              <section className="mt-10">
                <h2 className="text-xl font-bold mb-2">Mapa con los lugares recomendados</h2>
                <GoogleMapView
                  locations={
                    Object.values(responses)
                      .filter(r => typeof r.response !== "string" && Array.isArray((r.response as any).localizaciones))
                      .flatMap(r => (r.response as { localizaciones: Location[] }).localizaciones)
                  }
                />
              </section>
            )}
          </section>
        )}
      </div>
    </div>
  )
}