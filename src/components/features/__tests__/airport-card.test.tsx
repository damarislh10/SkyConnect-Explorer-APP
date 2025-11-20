
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { AirportCard } from '../airport-card';
import type { Airport } from '@/types';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => {
        return <img src={src} alt={alt} {...props} />;
    },
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

});

