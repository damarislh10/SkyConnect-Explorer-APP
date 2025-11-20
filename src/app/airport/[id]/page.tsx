
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAirportStore } from '@/store/airport-store';
import { getAirportById } from '@/services/aviationstack-service';
import { AirportDetailsTabs } from '@/components/features/airport-details-tabs';
import type { Airport } from '@/types';
import { Button } from '@/components/ui/button';
import { getCityFromTimezone } from '@/utils/airport-utils';
import styles from './page.module.scss';

export default function AirportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const airportId = params.id as string;

    const [airport, setAirport] = useState<Airport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAirport = async () => {
            if (!airportId) {
                setError('ID de aeropuerto no proporcionado');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await getAirportById(airportId);
                if (data) {
                    setAirport(data);
                    useAirportStore.getState().selectAirport(data);
                } else {
                    setError(`Aeropuerto con ID "${airportId}" no encontrado`);
                }
            } catch (err) {
                console.error('Error al buscar aeropuerto:', err);
                setError(err instanceof Error ? err.message : 'Error al cargar el aeropuerto');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAirport();
    }, [airportId]);

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-80px)] px-6 py-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500 dark:text-gray-400 min-h-[400px]">
                    <div className={styles.spinner}></div>
                    <p>Cargando información del aeropuerto...</p>
                </div>
            </div>
        );
    }

    if (error || !airport) {
        return (
            <div className="min-h-[calc(100vh-80px)] px-6 py-8 max-w-7xl mx-auto w-full">
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <h2 className="text-3xl text-gray-900 dark:text-gray-100 mb-4">Error</h2>
                    <p className="mb-8 text-gray-600 dark:text-gray-400">{error || 'Aeropuerto no encontrado'}</p>
                    <Button onClick={() => router.push('/')} variant="primary">
                        Volver al inicio
                    </Button>
                </div>
            </div>
        );
    }

    const city = getCityFromTimezone(airport.timezone) ||
        airport.city_iata_code ||
        airport.airport_name.split(' ')[0] ||
        'Ciudad';

    return (
        <div className="min-h-[calc(100vh-80px)] px-6 py-8 max-w-7xl mx-auto w-full">
            <div className="mb-12">
                <Button
                    onClick={() => router.back()}
                    variant="outline"
                    className="mb-6"
                >
                    ← Volver
                </Button>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {airport.airport_name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    {city}, {airport.country_name}
                </p>
            </div>

            <div className="w-full">
                <AirportDetailsTabs airport={airport} />
            </div>
        </div>
    );
}

