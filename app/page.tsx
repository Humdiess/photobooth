"use client"

import type React from "react"

import { useRef, useState } from "react"
import { captureImage, delay, downloadImage } from "@/lib/utils"
import WebcamPreview from "@/components/WebcamPreview"
import EffectSelector from "@/components/EffectSelector"
import CaptureButton from "@/components/CaptureButton"
import PhotoList from "@/components/PhotoList"
import FlashOverlay from "@/components/FlashOverlay"
import LayoutSelector from "@/components/LayoutSelector"
import DecorationSelector from "@/components/DecorationSelector"

export default function PhotoboothPage() {
  const webcamRef = useRef(null)
  const captureContainerRef = useRef<HTMLDivElement>(null)

  const [effect, setEffect] = useState("none")
  const [shots, setShots] = useState<string[]>([])
  const [isShooting, setIsShooting] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(-1)
  const [timerCount, setTimerCount] = useState(3)
  const [layout, setLayout] = useState<"grid" | "vertical">("grid")
  const [decoration, setDecoration] = useState<string>("none")
  const [showingTimer, setShowingTimer] = useState(false)

  const startShooting = async () => {
    if (isShooting) return
    setShots([])
    setIsShooting(true)
    setCurrentPhotoIndex(0)
    setShowingTimer(true)

    // Initial countdown in the first box
    for (let countdown = 3; countdown > 0; countdown--) {
      setTimerCount(countdown)
      await delay(1000)
    }

    // Take 4 photos with timer between each
    for (let i = 0; i < 4; i++) {
      setCurrentPhotoIndex(i)

      // Flash and capture
      setShowFlash(true)
      const image = captureImage(webcamRef, effect)
      if (image) {
        setShots((prev) => [...prev, image])
      }
      await delay(200)
      setShowFlash(false)

      // Show timer for next photo (except after the last one)
      if (i < 3) {
        setCurrentPhotoIndex(i + 1)
        for (let countdown = 3; countdown > 0; countdown--) {
          setTimerCount(countdown)
          await delay(1000)
        }
      }
    }

    setShowingTimer(false)
    setCurrentPhotoIndex(-1)
    setIsShooting(false)
  }

  const handleDownload = () => {
    if (captureContainerRef.current) {
      downloadImage(captureContainerRef as React.RefObject<HTMLElement>, decoration)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📸 Photobooth Kolase</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Left: Camera */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-md flex-1">
          <WebcamPreview webcamRef={webcamRef} effect={effect} />
          <EffectSelector effect={effect} setEffect={setEffect} />
          <CaptureButton onStart={startShooting} isShooting={isShooting} />
        </div>

        {/* Right: Collage */}
        <div className="flex-1 flex flex-col items-center">
          <LayoutSelector layout={layout} setLayout={setLayout} />

          <div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 items-center w-full border border-gray-200"
            ref={captureContainerRef}
          >
            <h2 className="text-gray-800 font-bold text-xl mb-2">Your Photos</h2>
            <PhotoList
              shots={shots}
              layout={layout}
              currentPhotoIndex={currentPhotoIndex}
              timerCount={timerCount}
              showingTimer={showingTimer}
              decoration={decoration}
            />
          </div>

          {shots.length === 4 && (
            <>
              <DecorationSelector decoration={decoration} setDecoration={setDecoration} />

              <button
                onClick={handleDownload}
                className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-bold text-white transition-all shadow-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Unduh Kolase
              </button>
            </>
          )}
        </div>
      </div>

      <FlashOverlay visible={showFlash} />
    </div>
  )
}
