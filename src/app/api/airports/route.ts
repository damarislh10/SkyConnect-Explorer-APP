/**
 * API Route para obtener aeropuertos (opcional, para SSR/ISR)
 * Puede usarse para cachear respuestas del lado del servidor
 */

import { NextResponse } from 'next/server';
import { getAirports } from '@/services/aviationstack-service';
import type { AirportFilters } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: AirportFilters = {
      search: searchParams.get('search') || undefined,
      limit: parseInt(searchParams.get('limit') || '10'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const data = await getAirports(filters);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error in airports API route:', error);
    return NextResponse.json(
      { error: 'Error fetching airports' },
      { status: 500 }
    );
  }
}

