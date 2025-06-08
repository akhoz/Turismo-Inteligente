import { useState } from "react"
import { FiCopy } from "react-icons/fi"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"



interface Response {
  model: string
  color: string
  response: string
  timestamp: string
}

interface ResponseTabsProps {
  responses: Record<string, Response>
}

export default function ResponseTabs({ responses }: ResponseTabsProps) {
  const entries = Object.entries(responses)
  const [activeTab, setActiveTab] = useState(entries[0]?.[0] || "")
  const [copiedTab, setCopiedTab] = useState<string | null>(null)


  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTab(id)
    setTimeout(() => setCopiedTab(null), 1500) // vuelve a ocultar el aviso luego de 1.5s
  }


  if (entries.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex space-x-1 overflow-x-auto">
            {entries.map(([id, data]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === id
                  ? "bg-white text-accent border border-gray-200 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${data.color} mr-2`}></div>
                  {data.model}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-gray-500">{responses[activeTab]?.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Response Body */}
      {entries.map(([id, data]) => {
        console.log(`[${data.model}] Markdown response:\n`, data.response)

        return (
          <div key={id} className={`${activeTab === id ? "block" : "hidden"}`}>
            <div className="flex justify-between items-center mb-4 p-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${data.color} mr-3`}></div>
                <h3 className="text-lg font-semibold text-gray-900">{data.model} Response</h3>
              </div>
              <button
                onClick={() => copyToClipboard(data.response, id)}
                className="text-sm text-accent hover:text-accent/80 font-medium flex items-center"
              >
                <FiCopy className="w-4 h-4 mr-1" />
                {copiedTab === id ? "Copied!" : "Copy"}
              </button>

            </div>
            <div className="prose prose-sm max-w-none text-gray-800 p-4">
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
                {data.response}
              </ReactMarkdown>

            </div>
          </div>
        )
      })}


      {/* Comparison Footer */}
      {entries.length > 1 && (
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600 flex justify-between">
          <span>Comparing {entries.length} models</span>
          <div className="flex gap-4">
            {entries.map(([id, data]) => (
              <div key={id} className="flex items-center text-xs">
                <div className={`w-2 h-2 rounded-full ${data.color} mr-1`}></div>
                {data.model}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
