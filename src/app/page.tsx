

'use client';

import { useEffect } from 'react';
import { useAirportStore } from '@/store/airport-store';
import { AirportSearch } from '@/components/features/airport-search';
import { AirportCard } from '@/components/features/airport-card';
import { Pagination } from '@/components/ui/pagination';
import { APP_NAME } from '@/constants';

export default function Home() {
  const {
    airports,
    currentPage,
    totalPages,
    isLoading,
    error,
    fetchAirports,
    setPage,
  } = useAirportStore();

  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]);

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-8 max-w-[1800px] mx-auto w-full">
      <div className="text-center mb-12 py-8">
        <h1 className="title-gotham mb-4">
          {APP_NAME}
        </h1>
      </div>

      <div className="mb-12 flex justify-center">
        <AirportSearch />
      </div>

      {error && (
        <div className="p-6 dark:bg-red-900/20  text-red-600 dark:text-red-400 text-center mb-8">
          <p>Error: Servicio no disponible intentalo más tarde</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
          <p>Cargando aeropuertos...</p>
        </div>
      ) : airports.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {airports.map((airport) => (
              <AirportCard key={airport.airport_id || airport.id} airport={airport} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-lg">
            <p>No se encontraron aeropuertos</p>
          </div>
        )
      )}
    </div>
  );
}
