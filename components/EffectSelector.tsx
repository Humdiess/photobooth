"use client"

interface EffectSelectorProps {
  effect: string
  setEffect: (effect: string) => void
}

export default function EffectSelector({ effect, setEffect }: EffectSelectorProps) {
  const effects = [
    { id: "none", name: "Normal" },
    { id: "grayscale", name: "Grayscale" },
    { id: "sepia", name: "Sepia" },
    { id: "blur", name: "Blur" },
    { id: "vintage", name: "Vintage" },
  ]

  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center">
      {effects.map((e) => (
        <button
          key={e.id}
          onClick={() => setEffect(e.id)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
            effect === e.id
              ? "bg-blue-100 text-blue-700 border border-blue-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {e.name}
        </button>
      ))}
    </div>
  )
}
