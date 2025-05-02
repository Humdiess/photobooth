"use client"

interface PhotoListProps {
  shots: string[]
  layout: "grid" | "vertical"
  currentPhotoIndex: number
  timerCount: number
  showingTimer: boolean
  decoration: string
}

export default function PhotoList({
  shots,
  layout,
  currentPhotoIndex,
  timerCount,
  showingTimer,
  decoration,
}: PhotoListProps) {
  // Create empty placeholders for missing shots
  const allShots = [...shots]
  while (allShots.length < 4) {
    allShots.push("")
  }

  const getDecorationClass = () => {
    switch (decoration) {
      case "birthday":
        return "bg-[url('/decorations/birthday.png')] bg-contain bg-no-repeat bg-center"
      case "wedding":
        return "bg-[url('/decorations/wedding.png')] bg-contain bg-no-repeat bg-center"
      case "christmas":
        return "bg-[url('/decorations/christmas.png')] bg-contain bg-no-repeat bg-center"
      case "hearts":
        return "bg-[url('/decorations/hearts.png')] bg-contain bg-no-repeat bg-center"
      default:
        return ""
    }
  }

  return (
    <div className={`w-full ${getDecorationClass()}`}>
      <div
        className={`
        w-full
        ${layout === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}
      `}
      >
        {allShots.map((shot, index) => (
          <div
            key={index}
            className={`
              relative
              ${layout === "grid" ? "aspect-square" : "aspect-[3/2]"}
              rounded-lg overflow-hidden border-2 border-gray-200 
              flex items-center justify-center bg-gray-100
            `}
          >
            {shot ? (
              <img src={shot || "/placeholder.svg"} alt={`Shot ${index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center p-4">
                <div className="text-3xl mb-2">📷</div>
                <div>Photo {index + 1}</div>
              </div>
            )}

            {/* Timer overlay inside the photo box */}
            {showingTimer && currentPhotoIndex === index && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-white text-xl mb-2">{index === 0 ? "Get Ready!" : "Next Photo"}</p>
                  <div className="text-6xl font-bold text-white animate-pulse">{timerCount}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
