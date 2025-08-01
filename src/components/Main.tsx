import { Globe } from "lucide-react"
import Headers from "./Headers"
import History from "./History"
import type { HttpMethod, Header as HeaderType, ApiRequest } from "../types/types"

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

const METHODS_COLOR: Record<HttpMethod, string> = {
  GET: 'bg-green-500 hover:bg-green-600',
  POST: 'bg-blue-500 hover:bg-blue-600',
  PUT: 'bg-orange-500 hover:bg-orange-600',
  DELETE: 'bg-red-500 hover:bg-red-600',
  PATCH: 'bg-purple-500 hover:bg-purple-600',
  HEAD: 'bg-gray-500 hover:bg-gray-600',
  OPTIONS: 'bg-indigo-500 hover:bg-indigo-600'
}

interface MainProps {
  method: HttpMethod
  url: string
  headers: HeaderType[]
  history: ApiRequest[]
  onMethodChange: (method: HttpMethod) => void
  onUrlChange: (url: string) => void
  onHeadersChange: (headers: HeaderType[]) => void
  onSelectRequest: (request: ApiRequest) => void
  onClearHistory: () => void
}

const Main = ({
  method,
  url,
  headers,
  history,
  onMethodChange,
  onUrlChange,
  onHeadersChange,
  onSelectRequest,
  onClearHistory
}: MainProps) => {
  return ( 
    <div className="container mx-auto px-3 sm:px-4">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="bg-white mt-4 sm:mt-6 border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center">
              <Globe className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <h2 className="ml-2 text-base sm:text-lg font-semibold">Запрос</h2>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative">
                  <select
                    value={method}
                    onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
                    className={`cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-white font-medium rounded-md text-sm sm:text-base ${METHODS_COLOR[method]}`}
                  >
                    {HTTP_METHODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => onUrlChange(e.target.value)}
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Введите URL"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Headers headers={headers} onHeadersChange={onHeadersChange} />
        </div>
        
        <History 
          history={history}
          onSelectRequest={onSelectRequest}
          onClearHistory={onClearHistory}
        />
      </div>
    </div>
  )
}
 
export default Main