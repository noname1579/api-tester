export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export interface Header {
  id: string
  key: string
  value: string
  enabled: boolean
}

export interface ApiRequest {
  id: string
  method: HttpMethod
  url: string
  headers: Header[]
  body?: string
  timestamp: number
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  duration: number
}