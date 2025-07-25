import { Globe } from "lucide-react"
import Headers from "./Headers"
import Response from "./Response"
import History from "./History"
import { useState } from "react"

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

const HTTP_Methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

const Methods_Color = {
  GET: 'bg-green-500 hover:bg-green-600',
  POST: 'bg-blue-500 hover:bg-blue-600',
  PUT: 'bg-orange-500 hover:bg-orange-600',
  DELETE: 'bg-red-500 hover:bg-red-600',
  PATCH: 'bg-purple-500 hover:bg-purple-600',
  HEAD: 'bg-gray-500 hover:bg-gray-600',
  OPTIONS: 'bg-indigo-500 hover:bg-indigo-600'
}

const Main = () => {
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [url, setUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return ( 
    <div className="container">
      <div className="flex">
        <div className="bg-white mt-12 border-blue-500 border-2 rounded-lg px-5 pt-6 pb-14 w-250">
          <div className="flex items-center">
            <Globe color="gray" />
            <h2 className="ml-3 text-lg font-semibold">Запрос</h2>
          </div>
          <div className="mt-6">
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as HttpMethod)}
                  className={`px-4 py-2 text-white font-medium rounded-md transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${Methods_Color[method]} focus:ring-${method === 'GET' ? 'green' : method === 'POST' ? 'blue' : method === 'PUT' ? 'orange' : method === 'DELETE' ? 'red' : method === 'PATCH' ? 'purple' : method === 'HEAD' ? 'gray' : 'indigo'}-500`}
                >
                  {HTTP_Methods.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 peer"
                />
                <label className={`absolute left-3 top-2 px-1 text-gray-500 transition-all duration-200 pointer-events-none
                  ${isFocused || url ? 'text-xs -top-3 bg-white text-blue-500' : ''}
                  peer-focus:text-xs peer-focus:-top-3 peer-focus:bg-white peer-focus:text-blue-500`}>
                  Введите URL
                </label>
              </div>
            </div>
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