'use client'

import clsx from 'clsx'

export default function FlashOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className={clsx(
        'fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    ></div>
  )
}
