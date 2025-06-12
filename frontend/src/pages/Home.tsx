import { useState } from "react"
import ModelSelector from "../components/ModelSelector"
import VacationPlanner from "../components/VacationPlanner"
import BusinessSuggestions from "../components/BusinessSuggestions"

export default function Home() {
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"vacation" | "business">("vacation")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    transition-transform duration-200 md:relative md:translate-x-0`}
      >
        <ModelSelector
          selectedModels={selectedModels}
          onToggleModel={toggleModel}
        />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-8 overflow-x-auto">
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

      <button
        className={`fixed ${
          activeTab === "vacation" ? "bottom-4" : "bottom-24"
        } right-4 z-30 py-4 px-5 bg-blue-500 text-white rounded-full shadow-lg md:hidden`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="text-2xl leading-none">☰</span>
      </button>
    </div>
  )
}