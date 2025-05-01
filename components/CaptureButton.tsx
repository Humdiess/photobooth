'use client'

export default function CaptureButton({ onStart, isShooting }: any) {
  return (
    <button
      onClick={onStart}
      disabled={isShooting}
      className="mt-4 bg-green-500 px-4 py-2 rounded font-bold text-black hover:bg-green-600 disabled:opacity-50"
    >
      {isShooting ? 'Memotret...' : 'Mulai Jepret 4x'}
    </button>
  )
}
