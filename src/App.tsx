import { useState, useCallback } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Response from './components/Response'
import { makeRequest, ApiError } from './types/apiClient'
import type { HttpMethod, Header as HeaderType, ApiRequest, ApiResponse } from './types/types'

export default function App() {
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState<HeaderType[]>([])
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ApiRequest[]>([])

  const sendRequest = useCallback(async () => {
    if (!url.trim()) {
      setError(new ApiError('Введите URL', 'validation'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const activeHeaders = headers
        .filter(h => h.enabled && h.key)
        .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {})

      const startTime = Date.now()
      const result = await makeRequest({
        method,
        url,
        headers: activeHeaders,
      })

      const requestData: ApiRequest = {
        id: Date.now().toString(),
        method,
        url,
        headers,
        timestamp: startTime,
      }

      setResponse({
        ...result,
        duration: Date.now() - startTime,
      })

      if (!history.some(r => r.url === url && r.method === method)) {
        setHistory(prev => [requestData, ...prev.slice(0, 9)])
      }
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Неизвестная ошибка', 'network'))
    } finally {
      setLoading(false)
    }
  }, [method, url, headers, history])

  const loadRequest = useCallback((request: ApiRequest) => {
    setMethod(request.method)
    setUrl(request.url)
    setHeaders(request.headers)
    setResponse(null)
    setError(null)
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header loading={loading} onSendRequest={sendRequest} />
      
      <div className="container mx-auto px-4 mt-6">
        <Main
          method={method}
          url={url}
          headers={headers}
          onMethodChange={setMethod}
          onUrlChange={setUrl}
          onHeadersChange={setHeaders}
          onLoadRequest={loadRequest}
          onClearHistory={clearHistory}
          history={history}
        />
        
        <Response response={response} error={error} loading={loading} />
      </div>
    </div>
  )
}