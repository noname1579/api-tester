import { CheckCircle, XCircle, Clock, AlertCircle, MessageSquareReply } from "lucide-react"
import type { ApiResponse } from "../types/types"
import type { ApiError } from "../types/apiClient"
import { PropagateLoader } from "react-spinners"

interface ResponseProps {
  response: ApiResponse | null
  error: ApiError | null
  loading: boolean
}

const Response = ({ response, error, loading }: ResponseProps) => {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600'
    if (status >= 400 && status < 500) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
    if (status >= 400 && status < 500) return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
    return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
  }

  const formatData = (data: any) => {
    if (typeof data === 'string') return data
    return JSON.stringify(data, null, 2)
  }

  return (  
    <div className="bg-white mt-4 sm:mt-6 border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-center">
        <MessageSquareReply className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <h2 className="ml-2 text-base sm:text-lg font-semibold">Ответ</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8 sm:py-12">
          <PropagateLoader size={10} />
        </div>
      ) : error ? (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 rounded-md">
          <div className="flex items-center text-red-600 text-sm sm:text-base">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="font-medium">Ошибка: {error.message}</span>
          </div>
        </div>
      ) : response ? (
        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-1 sm:gap-2 ${getStatusColor(response.status)} text-sm sm:text-base`}>
              {getStatusIcon(response.status)}
              <span className="font-medium">
                {response.status} {response.statusText}
              </span>
            </div>
            <div className="flex items-center text-gray-500 text-sm sm:text-base">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>{response.duration} мс</span>
            </div>
          </div>

          {response.data && (
            <div className="mt-3 sm:mt-4">
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Тело ответа:</h3>
              <pre className="bg-gray-50 p-2 sm:p-4 rounded-md overflow-auto max-h-64 sm:max-h-96 text-xs sm:text-sm">
                {formatData(response.data)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3 sm:mt-4 text-gray-500 text-sm sm:text-base">
          Нажмите "Отправить запрос" чтобы увидеть ответ
        </div>
      )}
    </div>
  )
}
 
export default Response