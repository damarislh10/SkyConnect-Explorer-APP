
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Airport, AirportFilters, SearchHistoryItem } from '@/types';
import { getAirports, getAirportByIata } from '@/services/aviationstack-service';

interface AirportState {
  airports: Airport[];
  selectedAirport: Airport | null;
  
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  
  searchQuery: string;
  searchHistory: SearchHistoryItem[];
  
  isLoading: boolean;
  error: string | null;
  
  fetchAirports: (filters?: AirportFilters) => Promise<void>;
  searchAirports: (query: string) => Promise<void>;
  selectAirport: (airport: Airport | null) => void;
  setPage: (page: number) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  clearError: () => void;
}

export const useAirportStore = create<AirportState>()(
  persist(
    (set, get) => ({
      airports: [],
      selectedAirport: null,
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      limit: 10,
      searchQuery: '',
      searchHistory: [],
      isLoading: false,
      error: null,
      
      fetchAirports: async (filters = {}) => {
        set({ isLoading: true, error: null });
        
        try {
          const { currentPage, limit, searchQuery } = get();
          const offset = (currentPage - 1) * limit;
          
          const response = await getAirports({
            ...filters,
            search: filters.search || searchQuery,
            limit,
            offset,
          });
          
          const totalPages = Math.ceil(response.pagination.total / limit);
          
          set({
            airports: response.data,
            totalCount: response.pagination.total,
            totalPages,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error al cargar aeropuertos';
          set({
            error: errorMessage,
            isLoading: false,
            airports: [],
          });
        }
      },
      
      searchAirports: async (query: string) => {
        set({ searchQuery: query, currentPage: 1 });
        
        if (query.trim()) {
          get().addToSearchHistory(query);
        }
        
        await get().fetchAirports({ search: query });
      },
      
      selectAirport: (airport: Airport | null) => {
        set({ selectedAirport: airport });
      },
      
      setPage: async (page: number) => {
        set({ currentPage: page });
        await get().fetchAirports();
      },
      
      addToSearchHistory: (query: string) => {
        const { searchHistory } = get();
        const newItem: SearchHistoryItem = {
          id: Date.now().toString(),
          query: query.trim(),
          timestamp: Date.now(),
        };
        
        const filtered = searchHistory.filter((item) => item.query !== newItem.query);
        const updated = [newItem, ...filtered].slice(0, 10);
        
        set({ searchHistory: updated });
      },
      
      clearSearchHistory: () => {
        set({ searchHistory: [] });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'airport-storage',
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        limit: state.limit,
      }),
    }
  )
);

