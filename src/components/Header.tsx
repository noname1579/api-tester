import { Send, Zap } from "lucide-react"

interface HeaderProps {
  loading: boolean
  onSendRequest: () => void
}

const Header = ({ loading, onSendRequest }: HeaderProps) => {
  return ( 
    <div className="shadow-sm bg-white sticky top-0 z-10">
      <div className="container flex items-center justify-between py-4">
        <div className="items-center flex">
          <Zap color="#166ffe" size={35} />
          <div className="ml-3 text-2xl font-bold text-gray-800">API Tester</div>
        </div>
        <button 
          className="bg-blue-500 flex hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer font-bold transition-colors"
          onClick={onSendRequest}
          disabled={loading}
        >
          <Send className="h-5 w-5" />
          <span className="ml-2">
            {loading ? 'Отправка...' : 'Отправить запрос'}
          </span>
        </button>
      </div>
    </div>
  )
}
 
export default Header