interface ModelSelectorProps {
  selectedModels: string[]
  onToggleModel: (model: string) => void
}

const models = [
  { id: "openai", name: "ChatGPT", icon: "/assets/openai.png", color: "bg-teal-400" },
  { id: "gemini", name: "Gemini", icon: "/assets/gemini.png", color: "bg-blue-900" },
  { id: "claude", name: "Claude", icon: "/assets/claude.png", color: "bg-purple-300" },
]

export default function ModelSelector({ selectedModels, onToggleModel }: ModelSelectorProps) {
  return (
    <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Modelos de IA</h2>
        <p className="text-sm text-gray-500 mt-1">Selecciona uno o más modelos</p>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onToggleModel(model.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedModels.includes(model.id)
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Icono con fondo de color */}
              <div className={`w-10 h-10 rounded-lg ${model.color} flex items-center justify-center`}>
                <img src={model.icon} alt={model.name} className="w-6 h-6 object-contain" />
              </div>

              {/* Nombre del modelo */}
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{model.name}</div>
                <div className={`text-xs ${selectedModels.includes(model.id) ? "text-blue-600" : "text-gray-500"}`}>
                  {selectedModels.includes(model.id) ? "Activo" : "Inactivo"}
                </div>
              </div>

              {/* Selector de estado visual */}
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedModels.includes(model.id) ? "bg-blue-500 border-blue-500" : "border-gray-300"
                }`}
              >
                {selectedModels.includes(model.id) && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          {selectedModels.length} modelo{selectedModels.length !== 1 ? "s" : ""} seleccionado
          {selectedModels.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  )
}