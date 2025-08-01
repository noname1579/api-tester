import { MessageSquareText, Plus, X } from "lucide-react"
import type { Header as HeaderType } from "../types/types"

interface HeadersProps {
  headers: HeaderType[]
  onHeadersChange: (headers: HeaderType[]) => void
}

const Headers = ({ headers, onHeadersChange }: HeadersProps) => {
  const addHeader = () => {
    const newHeader: HeaderType = {
      id: Date.now().toString(),
      key: '',
      value: '',
      enabled: true,
    }
    onHeadersChange([...headers, newHeader])
  }

  const updateHeader = (id: string, field: keyof HeaderType, value: string | boolean) => {
    onHeadersChange(
      headers.map(h => (h.id === id ? { ...h, [field]: value } : h))
    )
  }

  const removeHeader = (id: string) => {
    onHeadersChange(headers.filter(h => h.id !== id))
  }

  return (  
    <div className="block">
      <div className="bg-white mt-4 sm:mt-6 border border-gray-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center">
            <MessageSquareText className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="ml-2 text-lg font-semibold">Заголовки</h2>
          </div>
          
          <button 
            onClick={addHeader}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Добавить заголовок
          </button>
        </div>
        
        {headers.length === 0 ? (
          <div className="mt-3 text-gray-600 text-sm sm:text-base">
            <p>Заголовки не добавлены</p>
          </div>
        ) : (
          <div className="space-y-3">
            {headers.map((header) => (
              <div key={header.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex items-center w-full sm:w-auto">
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
                  />
                  <span className="sm:hidden text-sm">Активен</span>
                </div>
                
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                  placeholder="Имя заголовка"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                  placeholder="Значение заголовка"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  onClick={() => removeHeader(header.id)}
                  className="cursor-pointer p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors self-end sm:self-auto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Headers