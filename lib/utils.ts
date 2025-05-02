import type React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const captureImage = async (webcamRef: any, effect: string) => {
  if (!webcamRef.current) return null

  const screenshot = webcamRef.current.getScreenshot()
  if (!screenshot) return null

  // If no effect or effect is 'none', return the original screenshot
  if (!effect || effect === "none") {
    return screenshot
  }

  // Apply the effect to the screenshot using canvas
  try {
    const processedImage = await applyEffectToImage(screenshot, effect)
    return processedImage
  } catch (error) {
    console.error("Error applying filter:", error)
    return screenshot // Return original if filter application fails
  }
}

const applyEffectToImage = (imageDataUrl: string, effect: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        resolve(imageDataUrl) // Return original if context not available
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Apply effects
      switch (effect) {
        case "grayscale":
          applyGrayscale(ctx, canvas.width, canvas.height)
          break
        case "sepia":
          applySepia(ctx, canvas.width, canvas.height)
          break
        case "blur":
          applyBlur(ctx, canvas.width, canvas.height)
          break
        case "vintage":
          applyVintage(ctx, canvas.width, canvas.height)
          break
        default:
          break
      }

      resolve(canvas.toDataURL("image/jpeg"))
    }
    img.src = imageDataUrl
  })
}

const applyGrayscale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    data[i] = avg // red
    data[i + 1] = avg // green
    data[i + 2] = avg // blue
  }

  ctx.putImageData(imageData, 0, 0)
}

const applySepia = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
    data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
    data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
  }

  ctx.putImageData(imageData, 0, 0)
}

const applyBlur = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // Get the current image data
  const imageData = ctx.getImageData(0, 0, width, height)

  // Create a temporary canvas for the blur effect
  const tempCanvas = document.createElement("canvas")
  tempCanvas.width = width
  tempCanvas.height = height
  const tempCtx = tempCanvas.getContext("2d")

  if (!tempCtx) return

  // Draw the original image to the temp canvas
  tempCtx.putImageData(imageData, 0, 0)

  // Clear the original canvas
  ctx.clearRect(0, 0, width, height)

  // Apply blur using filter and draw back to original
  ctx.filter = "blur(4px)"
  ctx.drawImage(tempCanvas, 0, 0)
  ctx.filter = "none" // Reset filter
}

const applyVintage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  // First apply sepia
  applySepia(ctx, width, height)

  // Then adjust contrast and brightness
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  const contrast = 1.25 // Increase contrast
  const brightness = -15 // Slightly darker

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, (data[i] - 128) * contrast + 128 + brightness))
    data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * contrast + 128 + brightness))
    data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * contrast + 128 + brightness))
  }

  ctx.putImageData(imageData, 0, 0)
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const downloadImage = (captureContainerRef: React.RefObject<HTMLElement>, decoration: string) => {
  if (!captureContainerRef.current) return

  const container = captureContainerRef.current
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  if (!context) {
    console.error("Could not get canvas context")
    return
  }

  const width = container.offsetWidth
  const height = container.offsetHeight

  canvas.width = width
  canvas.height = height

  // Fill with white background
  context.fillStyle = "white"
  context.fillRect(0, 0, width, height)

  // If there's a decoration, draw it first as background
  if (decoration !== "none") {
    const decorationImg = new Image()
    decorationImg.crossOrigin = "anonymous"
    decorationImg.onload = () => {
      // Draw decoration as background
      context.globalAlpha = 0.2 // Make it semi-transparent
      context.drawImage(decorationImg, 0, 0, width, height)
      context.globalAlpha = 1.0

      // Then draw the content
      drawContent()
    }
    decorationImg.src = `/decorations/${decoration}.png`
  } else {
    // No decoration, just draw content
    drawContent()
  }

  function drawContent() {
    // Draw all elements from the container
    html2canvas(container).then((contentCanvas) => {
      if (context) {
        context.drawImage(contentCanvas, 0, 0)
      } else {
        console.error("Canvas context is null")
      }

      // Create download link
      const dataURL = canvas.toDataURL("image/jpeg")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "photobooth_collage.jpg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
}

// Simple html2canvas polyfill for this example
function html2canvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      console.error("Could not get canvas context")
      resolve(canvas)
      return
    }

    canvas.width = element.offsetWidth
    canvas.height = element.offsetHeight

    // Draw white background
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Find all images in the container
    const images = element.querySelectorAll("img")
    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        const rect = img.getBoundingClientRect()
        const containerRect = element.getBoundingClientRect()

        const x = rect.left - containerRect.left
        const y = rect.top - containerRect.top

        context.drawImage(img, x, y, rect.width, rect.height)
      }
    })

    resolve(canvas)
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
