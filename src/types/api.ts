export interface ApiRequest {
  id: string;
  name?: string;
  method: string;
  url: string;
  headers: [];
  body?: string;
  timestamp: number;
}