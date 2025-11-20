

import type { Airport, AirportResponse, AirportFilters } from '@/types';

const AVIATIONSTACK_API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';
const AVIATIONSTACK_BASE_URL = 'https://api.aviationstack.com/v1';


function buildApiUrl(endpoint: string, params: Record<string, string | number> = {}): string {
  const url = new URL(`${AVIATIONSTACK_BASE_URL}${endpoint}`);
  
  url.searchParams.append('access_key', AVIATIONSTACK_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}


export async function getAirports(filters: AirportFilters = {}): Promise<AirportResponse> {
  const { search, limit = 10, offset = 0 } = filters;
  
  const params: Record<string, string | number> = {
    limit,
    offset,
  };
  

  try {
    const url = buildApiUrl('/airports', params);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AirportResponse = await response.json();
    
    if ('error' in data) {
      throw new Error((data as any).error.info || 'Error fetching airports');
    }
    
    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      const filteredData = data.data.filter((airport) => 
        airport.airport_name?.toLowerCase().includes(searchTerm)
      );
      
      return {
        ...data,
        data: filteredData,
        pagination: {
          ...data.pagination,
          count: filteredData.length,
          total: filteredData.length,
        },
      };
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAirportByIata(iataCode: string): Promise<Airport | null> {
  try {
    const params: Record<string, string | number> = {
      iata_code: iataCode.toUpperCase(),
      limit: 1,
    };
    
    const url = buildApiUrl('/airports', params);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AirportResponse = await response.json();
    
    if ('error' in data) {
      throw new Error((data as any).error.info || 'Error fetching airport');
    }
    
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    
    return null;
  } catch (error) {
    throw error;
  }
}


export async function getAirportById(airportId: string): Promise<Airport | null> {
  try {
    const params: Record<string, string | number> = {
      limit: 1,
    };
    
    const url = buildApiUrl('/airports', params);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AirportResponse = await response.json();
    
    if ('error' in data) {
      throw new Error((data as any).error.info || 'Error fetching airport');
    }
    
    const airport = data.data.find(
      (a) => a.airport_id === airportId || a.id === airportId
    );
    
    return airport || null;
  } catch (error) {
    throw error;
  }
}

