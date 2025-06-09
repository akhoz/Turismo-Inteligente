interface BusinessSuggestionsProps {
  selectedModels: string[]
}

export default function BusinessSuggestions({ selectedModels }: BusinessSuggestionsProps) {
  // Datos simulados
  const messages = [
    { id: "1", role: "user", content: "Quiero ideas para un negocio en la playa" },
    { id: "2", role: "assistant", content: "Una opción sería un food truck de batidos naturales 🍍🥤" },
  ]
  const input = ""
  const isLoading = false

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Descubre oportunidades de negocio</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Obtén ideas innovadoras para emprendimientos turísticos, análisis de mercado y estrategias.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-4xl rounded-2xl px-4 py-3 ${
                message.role === "user" ? "bg-purple-500 text-white" : "bg-white border border-gray-200 text-gray-900"
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
            placeholder="Ej: Ideas para un restaurante ecológico en la montaña..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={selectedModels.length === 0}
          />
          <button
            type="submit"
            disabled={isLoading || selectedModels.length === 0}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-colors"
          >
            Enviar
          </button>
        </form>
        {selectedModels.length === 0 && (
          <p className="text-sm text-red-500 mt-2">Selecciona al menos un modelo de IA</p>
        )}
      </div>
    </div>
  )
}