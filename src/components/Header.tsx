import { Send, Zap } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface HeaderProps {
  loading: boolean
  onSendRequest: () => void
}

const Header = ({ loading, onSendRequest }: HeaderProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 600)
    } else {
      setIsRippling(false)
    }
  }, [coords])

  useEffect(() => {
    if (!isRippling) {
      setCoords({ x: -1, y: -1 })
    }
  }, [isRippling])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    
    onSendRequest()
  }

  return ( 
    <div className="shadow-sm bg-white sticky top-0 z-10">
      <div className="container flex justify-between py-3 px-4 sm:py-4">
        <div className="items-center flex">
          <Zap color="#166ffe" size={30} className="sm:size-[35px]" />
          <div className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-800">API Tester</div>
        </div>
        <button 
          ref={buttonRef}
          className={`relative bg-gradient-to-r from-blue-500 to-blue-600 flex hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer font-bold transition-all duration-300 text-sm sm:text-base items-center overflow-hidden
            ${isPressed ? 'scale-95 shadow-inner' : 'scale-100 shadow-md hover:shadow-lg'}
            ${loading ? 'opacity-80' : 'opacity-100'}
          `}
          onClick={handleClick}
          disabled={loading}
        >
          {isRippling && (
            <span 
              className="absolute bg-white/30 rounded-full animate-ripple"
              style={{
                left: coords.x,
                top: coords.y,
                width: '10px',
                height: '10px',
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
          <Send className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="ml-1 sm:ml-2">
            {loading ? (
              <span className="inline-flex items-center">
                <span className="animate-pulse">Отправка</span>
                <span className="ml-1 animate-bounce">...</span>
              </span>
            ) : (
              <>
                <span className="sm:hidden">Отправить</span>
                <span className="hidden sm:inline">Отправить запрос</span>
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  )
}

export default Header