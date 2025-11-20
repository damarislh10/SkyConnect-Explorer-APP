
'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Airport } from '@/types';
import styles from './AirportMap.module.scss';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export interface AirportMapProps {
    airport: Airport;
    className?: string;
}

export function AirportMap({ airport, className }: AirportMapProps) {
    const latitude = parseFloat(airport.latitude);
    const longitude = parseFloat(airport.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
        return (
            <div className={styles.errorContainer}>
                <p>Coordenadas no disponibles para este aeropuerto</p>
            </div>
        );
    }

    const position: [number, number] = [latitude, longitude];

    return (
        <div className={`${styles.mapContainer} ${className || ''}`}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <strong>{airport.airport_name}</strong>
                        <br />
                        {airport.iata_code && `IATA: ${airport.iata_code}`}
                        {airport.icao_code && ` | ICAO: ${airport.icao_code}`}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

