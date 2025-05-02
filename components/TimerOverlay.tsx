"use client"

import { useEffect, useState } from "react"

interface TimerOverlayProps {
  visible: boolean
  countdown: number
  type: "initial" | "between"
}

export default function TimerOverlay({ visible, countdown, type }: TimerOverlayProps) {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    if (!visible) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 300)

    return () => clearInterval(interval)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="text-center">
        {type === "initial" ? (
          <div className="flex flex-col items-center">
            <p className="text-white text-2xl mb-2">Get Ready!</p>
            <div className="text-7xl font-bold text-white animate-pulse">{countdown}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-white text-2xl mb-2">Next photo in</p>
            <div className="text-7xl font-bold text-white animate-pulse">{countdown}</div>
            <p className="text-white text-xl mt-4">Smile{dots}</p>
          </div>
        )}
      </div>
    </div>
  )
}
