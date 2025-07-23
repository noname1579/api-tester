import { Globe } from "lucide-react"

const Main = () => {
  return ( 
    <div className="container">
      <div className="1 block">
        <div className="bg-white mt-12 border border-gray-500 rounded-lg p-5 w-250">
          <div className="flex items-center">
            <Globe color="gray" />
            <h2 className="ml-3 text-lg font-semibold">Запрос</h2>
          </div>
          <div className="mt-3">
            <button>GET</button>
            <input type="text" placeholder="Введите URL" className="w-[80%] ml-6 px-2 py-1 border rounded-md border-gray-500 text-black" />
          </div>
        </div>
        <div className="history"></div>
      </div>
      <div className="headers"></div>
      <div className="response"></div>
    </div>
  )
}
 
export default Main