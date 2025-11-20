
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAirportStore } from '@/store/airport-store';
import { AirportSearch } from '@/components/features/airport-search';
import { AirportCard } from '@/components/features/airport-card';
import { Pagination } from '@/components/ui/pagination';
import { APP_NAME } from '@/constants';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();
  const {
    airports,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchQuery,
    fetchAirports,
    setPage,
  } = useAirportStore();

  const isInitialScreen = !searchQuery && airports.length === 0 && !isLoading;

  const handleTitleClick = () => {
    useAirportStore.setState({
      searchQuery: '',
      airports: [],
      currentPage: 1,
      error: null,
    });
    router.push('/');
  };

  useEffect(() => {
    if (searchQuery) {
      fetchAirports();
    }
  }, [fetchAirports, searchQuery]);

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  if (isInitialScreen) {
    return (
      <div className={styles.initialScreen}>
        <div className={styles.initialContent}>
          <h1 className={styles.initialTitle}>
            {APP_NAME}
          </h1>

          <div className={styles.initialSearchWrapper}>
            <AirportSearch variant="initial" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 sm:px-6 py-5 sm:py-8 max-w-[1800px] mx-auto w-full">
      <div className={styles.resultsHeader}>
        <h1
          className={styles.resultsTitle}
          onClick={handleTitleClick}
        >
          {APP_NAME}
        </h1>
        <div className={styles.resultsSearchWrapper}>
          <AirportSearch variant="results" />
        </div>
      </div>

      {error && (
        <div className="p-4 sm:p-6 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center mb-8 rounded-lg text-sm sm:text-base">
          <p>Error: Servicio no disponible inténtalo más tarde</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm sm:text-base">Cargando aeropuertos...</p>
        </div>
      ) : airports.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {airports.map((airport) => (
              <AirportCard key={airport.airport_id || airport.id} airport={airport} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-5 sm:mt-12 p-3 sm:p-4">
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
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            <p>No se encontraron aeropuertos</p>
          </div>
        )
      )}
    </div>
  );
}
