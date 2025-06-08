"use client"

import { useState } from "react"
import type { ChangeEvent, DragEvent } from "react"
import { FiFileText, FiArrowLeft, FiCopy } from "react-icons/fi"

interface FileUploaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUpload: (file: File, content: any) => void
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState("")
  const [jsonContent, setJsonContent] = useState<Record<string, unknown> | null>(null)
  const [activeTab, setActiveTab] = useState<"upload" | "preview">("upload")

  const handleFile = (file: File) => {
    if (file.type === "application/json") {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target?.result as string)
          setJsonContent(content)
          onFileUpload(file, content)
          setFileName(file.name)
          setActiveTab("preview")
        } catch {
          alert("Invalid JSON file")
        }
      }
      reader.readAsText(file)
    } else {
      alert("Only JSON files are allowed.")
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0])
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "upload" ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
        >
          Upload JSON
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          disabled={!jsonContent}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-black text-black" : "text-gray-500"
            } ${!jsonContent ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Preview
        </button>
      </div>


      {/* Upload UI */}
      {activeTab === "upload" && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-accent bg-accent/5" : "border-gray-300"
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input type="file" accept=".json" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0" />
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            {fileName ? (
              <>
                <span className="font-medium text-accent">{fileName}</span> uploaded
              </>
            ) : (
              <>
                <span className="font-medium">Click to upload</span> or drag & drop
              </>
            )}
          </p>
        </div>
      )}

      {/* Preview */}
      {activeTab === "preview" && jsonContent && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{fileName}</span>
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonContent, null, 2))}
              className="text-sm text-accent hover:text-accent/80 font-medium flex items-center"
            >
              <FiCopy className="mr-1" />
              Copy
            </button>
          </div>
          <pre className="p-4 text-sm overflow-auto max-h-64 text-gray-800 font-mono bg-white">
            {JSON.stringify(jsonContent, null, 2)}
          </pre>
          <div className="bg-gray-50 px-4 py-2 border-t flex justify-end">
            <button
              onClick={() => setActiveTab("upload")}
              className="text-xs text-accent hover:text-accent/80 font-medium flex items-center"
            >
              <FiArrowLeft className="mr-1" />
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
