'use client'

import Webcam from 'react-webcam'
import clsx from 'clsx'

export default function WebcamPreview({ webcamRef, effect }: any) {
  return (
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/png"
      className={clsx(
        'rounded-lg w-full max-w-md aspect-video object-cover',
        {
          'filter-none': effect === 'none',
          'grayscale': effect === 'grayscale',
          'sepia': effect === 'sepia',
          'invert': effect === 'invert',
        }
      )}
      videoConstraints={{ facingMode: 'user' }}
    />
  )
}
