import { FiCheckCircle } from "react-icons/fi"

interface Model {
  id: string
  name: string
  endpoint: string
  color: string // aún se usa para el borde o estilos si quieres
}

interface ModelSelectorProps {
  models: Model[]
  selectedModels: Model[]
  onModelsChange: (models: Model[]) => void
}

const getModelIcon = (id: string): string => {
  switch (id) {
    case "chatgpt":
      return "/assets/openai.png"
    case "gemini":
      return "/assets/gemini.png"
    case "claude":
      return "/assets/claude.png"
    default:
      return ""
  }
}

export default function ModelSelector({ models, selectedModels, onModelsChange }: ModelSelectorProps) {
  const toggleModel = (model: Model) => {
    const exists = selectedModels.some((m) => m.id === model.id)
    onModelsChange(exists ? selectedModels.filter((m) => m.id !== model.id) : [...selectedModels, model])
  }

  const selectAll = () => onModelsChange(models)
  const clearAll = () => onModelsChange([])

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-gray-700">
          Select AI Models ({selectedModels.length} selected)
        </label>
        <div className="flex gap-2 text-xs font-medium">
          <button onClick={selectAll} className="text-accent hover:text-accent/80">Select All</button>
          <span className="text-gray-300">|</span>
          <button onClick={clearAll} className="text-gray-500 hover:text-gray-700">Clear All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {models.map((model) => {
          const isSelected = selectedModels.some((m) => m.id === model.id)
          return (
            <div
              key={model.id}
              onClick={() => toggleModel(model)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                isSelected ? "border-accent bg-accent/5 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-3 ${
                    isSelected ? "bg-accent border-accent" : "border-gray-300"
                  }`}
                >
                  {isSelected && <FiCheckCircle className="text-white w-3 h-3" />}
                </div>
                <div className="flex-1 flex items-center">
                  <img
                    src={getModelIcon(model.id)}
                    alt={model.name}
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span className={`text-sm font-medium ${isSelected ? "text-accent" : "text-gray-900"}`}>
                    {model.name}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedModels.length > 0 && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4" />
          Selected models: {selectedModels.map((m) => m.name).join(", ")}
        </div>
      )}
    </div>
  )
}
