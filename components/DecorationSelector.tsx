"use client"

interface DecorationSelectorProps {
  decoration: string
  setDecoration: (decoration: string) => void
}

export default function DecorationSelector({ decoration, setDecoration }: DecorationSelectorProps) {
  const decorations = [
    { id: "none", name: "Tanpa Hiasan" },
    { id: "birthday", name: "Ulang Tahun" },
    { id: "wedding", name: "Pernikahan" },
    { id: "christmas", name: "Natal" },
    { id: "hearts", name: "Hati" },
  ]

  return (
    <div className="mt-4 w-full">
      <h3 className="font-medium mb-2">Pilih Hiasan Kolase:</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {decorations.map((dec) => (
          <button
            key={dec.id}
            onClick={() => setDecoration(dec.id)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              decoration === dec.id
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {dec.name}
          </button>
        ))}
      </div>
    </div>
  )
}
