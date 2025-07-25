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
    <div className="bg-white mt-6 ml-6 border border-gray-200 rounded-lg p-6 w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HistoryIcon className="text-gray-400 w-5 h-5" />
          <h2 className="ml-2 text-lg font-semibold">История запросов</h2>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">История пуста</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((request) => (
            <div
              key={request.id}
              onClick={() => onSelectRequest(request)}
              className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${methodColors[request.method]}`}>
                  {request.method}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(request.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium truncate">
                {new URL(request.url).pathname || '/'}
              </p>
              <p className="text-xs text-gray-500 truncate">{request.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
 
export default History