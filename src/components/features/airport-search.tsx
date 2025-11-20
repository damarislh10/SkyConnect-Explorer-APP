
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAirportStore } from '@/store/airport-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';
import styles from './AirportSearch.module.scss';

export function AirportSearch() {
    const [localQuery, setLocalQuery] = useState('');
    const { searchQuery, searchAirports, isLoading, fetchAirports } = useAirportStore();
    const isInitialMount = useRef(true);

    const debouncedQuery = useDebounce(localQuery, 500);

    useEffect(() => {
        if (searchQuery) {
            setLocalQuery(searchQuery);
        }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (debouncedQuery.trim()) {
            searchAirports(debouncedQuery);
        } else if (debouncedQuery === '') {
            fetchAirports({ search: '' });
        }
    }, [debouncedQuery, searchAirports, fetchAirports]);

    const handleSearch = async () => {
        if (localQuery.trim()) {
            await searchAirports(localQuery);
        } else {
            await fetchAirports({ search: '' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex gap-4 w-full max-w-[600px] md:max-w-[800px] mx-auto">
            <Input
                type="text"
                placeholder="Buscar aeropuertos..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
            />
            <Button
                onClick={handleSearch}
                disabled={isLoading}
                className={styles.searchButton}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                Buscar
            </Button>
        </div>
    );
}

