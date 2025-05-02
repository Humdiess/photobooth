interface FlashOverlayProps {
    visible: boolean
  }
  
  export default function FlashOverlay({ visible }: FlashOverlayProps) {
    if (!visible) return null
  
    return <div className="fixed inset-0 bg-white z-50 animate-flash"></div>
  }
  