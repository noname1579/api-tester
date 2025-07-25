import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

const Response = ({ response, error, loading }: ResponseProps) => {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600'
    if (status >= 400 && status < 500) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-5 h-5" />
    if (status >= 400 && status < 500) return <AlertCircle className="w-5 h-5" />
    return <XCircle className="w-5 h-5" />
  }

  const formatData = (data: any) => {
    if (typeof data === 'string') return data
    return JSON.stringify(data, null, 2)
  }

  return (  
    <div className="bg-white mt-6 border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold">Ответ</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <div className="flex items-center text-red-600">
            <XCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Ошибка: {error.message}</span>
          </div>
        </div>
      ) : response ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${getStatusColor(response.status)}`}>
              {getStatusIcon(response.status)}
              <span className="font-medium">
                {response.status} {response.statusText}
              </span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{response.duration} мс</span>
            </div>
          </div>

          {response.data && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Тело ответа:</h3>
              <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 text-sm">
                {formatData(response.data)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 text-gray-500">
          Нажмите "Отправить запрос" чтобы увидеть ответ
        </div>
      )}
    </div>
  )
}
 
export default Response