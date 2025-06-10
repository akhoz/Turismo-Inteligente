import { useState } from "react"
import ModelSelector from "../components/ModelSelector"
import VacationPlanner from "../components/VacationPlanner"
import BusinessSuggestions from "../components/BusinessSuggestions"

export default function Home() {
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"vacation" | "business">("vacation")

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModelSelector selectedModels={selectedModels} onToggleModel={toggleModel} />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("vacation")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "vacation"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              🏖️ Planeación de Vacaciones
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "business"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              💼 Emprendimientos Turísticos
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === "vacation" ? (
            <VacationPlanner selectedModels={selectedModels} />
          ) : (
            <BusinessSuggestions selectedModels={selectedModels} />
          )}
        </div>
      </div>
    </div>
  )
}