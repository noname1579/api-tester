import { Send, Zap } from "lucide-react"

interface HeaderProps {
  loading: boolean
  onSendRequest: () => void
}

const Header = ({ loading, onSendRequest }: HeaderProps) => {
  return ( 
    <div className="shadow-sm bg-white sticky top-0 z-10">
      <div className="container flex justify-between py-3 px-4 sm:py-4">
        <div className="items-center flex">
          <Zap color="#166ffe" size={30} className="sm:size-[35px]" />
          <div className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-800">API Tester</div>
        </div>
        <button 
          className="bg-blue-500 flex hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer font-bold transition-colors text-sm sm:text-base items-center"
          onClick={onSendRequest}
          disabled={loading}
        >
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="ml-1 sm:ml-2">
            {loading ? (
              'Отправка...'
            ) : (
              <>
                <span className="sm:hidden">Отправить</span>
                <span className="hidden sm:inline">Отправить запрос</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
 
export default Header