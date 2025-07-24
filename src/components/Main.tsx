import { Globe } from "lucide-react"
import Headers from "./Headers"
import Response from "./Response"
import History from "./History"

const Main = () => {
  return ( 
    <div className="container">
      <div className="flex">
        <div className="bg-white mt-12 border-blue-500 border-2 rounded-lg px-5 pt-6 pb-14 w-250">
          <div className="flex items-center">
            <Globe color="gray" />
            <h2 className="ml-3 text-lg font-semibold">Запрос</h2>
          </div>
          <div className="mt-6">
            <button>GET</button>
            <input type="text" placeholder="Введите URL" className="w-[80%] ml-6 px-2 py-1 border rounded-md border-gray-500 text-black" />
          </div>
        </div>
        <History />
      </div>
      <Headers />
      <Response />
    </div>
  )
}
 
export default Main