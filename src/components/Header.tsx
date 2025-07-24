import { Send, Zap } from "lucide-react"

const Header = () => {
  return ( 
    <div className="shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <div className="items-center flex h-18">
          <Zap color="#166ffe" size={35} />
          <div className="ml-3 text-2xl font-bold text-gray-800">API Tester</div>
        </div>
        <button className="bg-blue-500 flex text-white p-3 rounded-lg cursor-pointer font-bold" onClick={() => alert('click')}>
          <Send />
          <h1 className="ml-2">Отправить запрос</h1>
        </button>
      </div>
    </div>
  )
}
 
export default Header