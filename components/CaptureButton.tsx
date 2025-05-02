"use client"

interface CaptureButtonProps {
  onStart: () => void
  isShooting: boolean
}

export default function CaptureButton({ onStart, isShooting }: CaptureButtonProps) {
  return (
    <button
      onClick={onStart}
      disabled={isShooting}
      className={`mt-6 px-8 py-4 rounded-full font-bold text-white transition-all shadow-md ${
        isShooting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isShooting ? "Mengambil Foto..." : "Ambil Foto"}
    </button>
  )
}
