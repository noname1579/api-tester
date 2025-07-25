import { useState } from "react"
import { Plus, X } from "lucide-react"

interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

const Headers = () => {
  const [headers, setHeaders] = useState<Header[]>([])

  const addHeader = () => {
    const newHeader: Header = {
      id: Date.now().toString(),
      key: '',
      value: '',
      enabled: true,
    }
    setHeaders([...headers, newHeader])
  }

  const updateHeader = (id: string, field: keyof Header, value: string | boolean) => {
    setHeaders(
      headers.map(h => (h.id === id ? { ...h, [field]: value } : h))
    )
  }

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id))
  }

  return (  
    <div className="block">
      <div className="bg-white mt-12 border-blue-500 border-2 rounded-lg px-5 pt-6 pb-14 w-250">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Заголовки</h2>
          <button onClick={addHeader} className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            Добавить заголовок
          </button>
        </div>
        
        {headers.length === 0 ? (
          <div className="mt-3 text-gray-600">
            <p>Заголовки не добавлены</p>
          </div>
        ) : (
          <div className="space-y-3">
            {headers.map((header) => (
              <div key={header.id} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={header.enabled}
                  onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                  placeholder="Имя заголовка"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                  placeholder="Значение заголовка"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeHeader(header.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"
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