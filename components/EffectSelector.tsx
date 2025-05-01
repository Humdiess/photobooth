'use client'

const effects = ['none', 'grayscale', 'sepia', 'invert']

export default function EffectSelector({ effect, setEffect }: any) {
  return (
    <div className="flex gap-2 mt-4 flex-wrap justify-center">
      {effects.map((e) => (
        <button
          key={e}
          onClick={() => setEffect(e)}
          className={`px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm ${
            e === effect ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {e}
        </button>
      ))}
    </div>
  )
}
