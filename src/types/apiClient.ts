export class ApiError extends Error {
  type: 'network' | 'server' | 'validation';

  constructor(message: string, type: 'network' | 'server' | 'validation') {
    super(message);
    this.name = 'ApiError';
    this.type = type;
  }
}

export const makeRequest = async (request: {
  method: string
  url: string
  headers: Record<string, string>
  body?: string
}) => {
  try {
    const startTime = Date.now()
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })

    const duration = Date.now() - startTime
    const data = await response.text()

    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: tryParseJson(data),
      duration,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(error.message, 'network')
    }
    throw new ApiError('Unknown error occurred', 'network')
  }
}

const tryParseJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}