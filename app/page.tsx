'use client'

import { useRef, useState } from 'react'
import { captureImage, delay, downloadImage } from '@/lib/utils'
import WebcamPreview from '@/components/WebcamPreview'
import EffectSelector from '@/components/EffectSelector'
import CaptureButton from '@/components/CaptureButton'
import PhotoList from '@/components/PhotoList'
import FlashOverlay from './FlashOverlay'

export default function PhotoboothPage() {
  const webcamRef = useRef(null)
  const captureContainerRef = useRef<HTMLDivElement>(null)

  const [effect, setEffect] = useState('none')
  const [shots, setShots] = useState<string[]>([])
  const [isShooting, setIsShooting] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  const startShooting = async () => {
    if (isShooting) return
    setShots([])
    setIsShooting(true)
    for (let i = 0; i < 4; i++) {
      const image = captureImage(webcamRef)
      if (image) {
        setShowFlash(true)
        setShots((prev) => [...prev, image])
        await delay(200)
        setShowFlash(false)
      }
      await delay(3000)
    }
    setIsShooting(false)
  }

  const handleDownload = () => {
    if (captureContainerRef.current) {
      downloadImage(captureContainerRef as React.RefObject<HTMLElement>)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">📸 Photobooth Kolase</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Kiri: Kamera */}
        <div className="flex flex-col items-center">
          <WebcamPreview webcamRef={webcamRef} effect={effect} />
          <EffectSelector effect={effect} setEffect={setEffect} />
          <CaptureButton onStart={startShooting} isShooting={isShooting} />
        </div>

        {/* Kanan: Kolase */}
        <div
          className="bg-white rounded-lg shadow-xl p-4 flex flex-col gap-2 items-center"
          ref={captureContainerRef}
        >
          <PhotoList shots={shots} />
        </div>
      </div>

      {shots.length === 4 && (
        <button
          onClick={handleDownload}
          className="mt-6 bg-blue-500 px-4 py-2 rounded font-bold text-white hover:bg-blue-600"
        >
          Unduh Kolase
        </button>
      )}

      <FlashOverlay visible={showFlash} />
    </div>
  )
}
