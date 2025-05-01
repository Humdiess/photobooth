import html2canvas from 'html2canvas'

export function captureImage(webcamRef: any): string | null {
  return webcamRef.current?.getScreenshot() ?? null
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function downloadImage(ref: React.RefObject<HTMLElement>) {
  if (!ref.current) return
  const canvas = await html2canvas(ref.current)
  const link = document.createElement('a')
  link.download = 'photobooth-kolase.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
