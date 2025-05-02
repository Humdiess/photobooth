"use client"

interface LayoutSelectorProps {
  layout: "grid" | "vertical"
  setLayout: (layout: "grid" | "vertical") => void
}

export default function LayoutSelector({ layout, setLayout }: LayoutSelectorProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <span className="font-medium">Layout Kolase:</span>
      <div className="flex gap-2">
        <button
          onClick={() => setLayout("grid")}
          className={`p-2 rounded-md flex flex-col items-center ${
            layout === "grid" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="grid grid-cols-2 gap-1 w-12 h-12 mb-1">
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-gray-400 rounded-sm"></div>
            <div className="bg-gray-400 rounded-sm"></div>
          </div>
          <span className="text-xs">Grid 2x2</span>
        </button>

        <button
          onClick={() => setLayout("vertical")}
          className={`p-2 rounded-md flex flex-col items-center ${
            layout === "vertical" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex flex-col gap-1 w-8 h-12 mb-1">
            <div className="bg-gray-400 rounded-sm h-2"></div>
            <div className="bg-gray-400 rounded-sm h-2"></div>
            <div className="bg-gray-400 rounded-sm h-2"></div>
            <div className="bg-gray-400 rounded-sm h-2"></div>
          </div>
          <span className="text-xs">Vertikal</span>
        </button>
      </div>
    </div>
  )
}
