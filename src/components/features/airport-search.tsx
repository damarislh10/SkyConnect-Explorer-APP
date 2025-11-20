
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAirportStore } from '@/store/airport-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounce';
import styles from './AirportSearch.module.scss';

interface AirportSearchProps {
    variant?: 'initial' | 'results';
}

export function AirportSearch({ variant = 'initial' }: AirportSearchProps) {
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

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (variant === 'initial' && !localQuery.trim()) {
            return;
        }

        if (localQuery.trim()) {
            await searchAirports(localQuery);
        } else {
            await fetchAirports({ search: '' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (variant === 'initial' && !localQuery.trim()) {
                e.preventDefault();
                return;
            }
            handleSearch();
        }
    };

    if (variant === 'initial') {
        return (
            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-4 w-full max-w-[600px] mx-auto items-center px-4 sm:px-0"
            >
                <Input
                    type="text"
                    placeholder="Buscar aeropuertos..."
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full rounded-[18292.29px]"
                    disabled={isLoading}
                    required
                    minLength={1}
                />
                <Button
                    type="submit"
                    onClick={handleSearch}
                    disabled={isLoading || !localQuery.trim()}
                    className={`w-full sm:w-1/2 ${styles.searchButton}`}
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
            </form>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Input
                type="text"
                placeholder="Buscar aeropuertos..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 rounded-[18292.29px] w-full sm:w-auto"
                disabled={isLoading}
            />
            <Button
                onClick={handleSearch}
                disabled={isLoading}
                className={`${styles.searchButton} w-full sm:w-auto`}
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

