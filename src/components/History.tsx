import { History as HistoryIcon, Clock, Trash2 } from "lucide-react"
import type { ApiRequest, HttpMethod } from "../types/types"

interface HistoryProps {
  history: ApiRequest[]
  onSelectRequest: (request: ApiRequest) => void
  onClearHistory: () => void
}

const methodColors: Record<HttpMethod, string> = {
  GET: 'bg-green-100 text-green-800',
  POST: 'bg-blue-100 text-blue-800',
  PUT: 'bg-orange-100 text-orange-800',
  DELETE: 'bg-red-100 text-red-800',
  PATCH: 'bg-purple-100 text-purple-800',
  HEAD: 'bg-gray-100 text-gray-800',
  OPTIONS: 'bg-indigo-100 text-indigo-800'
}

const History = ({ history, onSelectRequest, onClearHistory }: HistoryProps) => {
  return (  
    <div className="bg-white mt-4 sm:mt-6 border border-gray-200 rounded-lg p-4 sm:p-6 w-full lg:ml-6 lg:w-80">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <HistoryIcon className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <h2 className="ml-2 text-base sm:text-lg font-semibold">История</h2>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-xs sm:text-sm">История пуста</p>
      ) : (
        <div className="space-y-2 max-h-48 sm:max-h-96 overflow-y-auto">
          {history.map((request) => (
            <div
              key={request.id}
              onClick={() => onSelectRequest(request)}
              className="p-2 sm:p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded ${methodColors[request.method]}`}>
                  {request.method}
                </span>
                <span className="text-gray-500 flex items-center">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                  {new Date(request.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1 font-medium truncate">
                {new URL(request.url).pathname || '/'}
              </p>
              <p className="text-gray-500 truncate">{request.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
 
export default History