'use client'

export default function PhotoList({ shots }: { shots: string[] }) {
  return (
    <>
      {shots.map((src, i) => (
        <div
          key={i}
          className="bg-white border border-gray-300 p-1 rounded-md shadow-sm"
        >
          <img
            src={src}
            alt={`shot-${i}`}
            className="object-cover w-48 h-36 rounded"
          />
        </div>
      ))}
    </>
  )
}
