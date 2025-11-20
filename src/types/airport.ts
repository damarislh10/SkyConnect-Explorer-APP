
export interface Airport {
  id: string;
  gmt: string;
  airport_id: string;
  iata_code: string;
  city_iata_code: string;
  icao_code: string;
  country_iso2: string;
  geoname_id: string;
  latitude: string;
  longitude: string;
  airport_name: string;
  country_name: string;
  phone_number: string | null;
  timezone: string;
}

export interface AirportResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Airport[];
}

export interface AirportFilters {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

