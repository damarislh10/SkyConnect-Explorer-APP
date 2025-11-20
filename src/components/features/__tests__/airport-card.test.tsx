/**
 * Test unitario para el componente AirportCard
 */

import { render, screen } from '@testing-library/react';
import { AirportCard } from '../airport-card';
import type { Airport } from '@/types';

// Mock de next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockAirport: Airport = {
    id: '1',
    gmt: '-5',
    airport_id: '1',
    iata_code: 'BOG',
    city_iata_code: 'BOG',
    icao_code: 'SKBO',
    country_iso2: 'CO',
    geoname_id: '3688689',
    latitude: '4.70159',
    longitude: '-74.1469',
    airport_name: 'Aeropuerto Internacional El Dorado',
    country_name: 'Colombia',
    phone_number: '+57 1 2662000',
    timezone: 'America/Bogota',
};

describe('AirportCard', () => {
    it('renders airport information correctly', () => {
        render(<AirportCard airport={mockAirport} />);

        expect(screen.getByText('Aeropuerto Internacional El Dorado')).toBeInTheDocument();
        expect(screen.getByText(/BOG, Colombia/i)).toBeInTheDocument();
        expect(screen.getByText('BOG')).toBeInTheDocument();
    });

    it('displays IATA code when available', () => {
        render(<AirportCard airport={mockAirport} />);

        const iataCode = screen.getByText('BOG');
        expect(iataCode).toBeInTheDocument();
    });

    it('displays ICAO code when IATA is not available', () => {
        const airportWithoutIata = { ...mockAirport, iata_code: '' };
        render(<AirportCard airport={airportWithoutIata} />);

        expect(screen.getByText('SKBO')).toBeInTheDocument();
    });

    it('is clickable', () => {
        render(<AirportCard airport={mockAirport} />);

        const card = screen.getByText('Aeropuerto Internacional El Dorado').closest('div[role="button"]');
        expect(card).toBeInTheDocument();
    });
});

