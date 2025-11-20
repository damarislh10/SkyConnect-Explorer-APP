

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Re-exportar tipos de aeropuertos
export type {
  Airport,
  AirportResponse,
  AirportFilters,
  SearchHistoryItem,
} from './airport';
