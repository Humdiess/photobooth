import type React from "react"
import Webcam from "react-webcam"

interface WebcamPreviewProps {
  webcamRef: React.RefObject<Webcam | null>
  effect: string
}

export default function WebcamPreview({ webcamRef, effect }: WebcamPreviewProps) {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  const getEffectClass = () => {
    switch (effect) {
      case "grayscale":
        return "filter grayscale"
      case "sepia":
        return "filter sepia"
      case "blur":
        return "filter blur-sm"
      case "vintage":
        return "filter sepia brightness-75 contrast-125"
      default:
        return ""
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md border-4 border-white">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className={`w-full max-w-md ${getEffectClass()}`}
      />
      <div className="absolute bottom-3 left-3 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
        {effect === "none" ? "Normal" : effect.charAt(0).toUpperCase() + effect.slice(1)}
      </div>
    </div>
  )
}
