"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Airport } from "@/types";
import { Card } from "@/components/ui/card";
import styles from "./AirportCard.module.scss";
import planeIcon from "@/assets/icons/iconAirplane.png";
import { getCityFromTimezone } from "@/utils/airport-utils";

export interface AirportCardProps {
    airport: Airport;
}

export function AirportCard({ airport }: AirportCardProps) {
    const router = useRouter();

    const handleClick = () => {
        const airportId = airport.airport_id;
        router.push(`/airport/${airportId}`);
    };

    const city = getCityFromTimezone(airport.timezone) ||
        airport.city_iata_code ||
        airport.airport_name.split(" ")[0] ||
        "Ciudad";

    const mainCode = airport.iata_code || airport.icao_code || "N/A";

    return (
        <Card
            variant="hover"
            onClick={handleClick}
            className={`${styles.airportCard} flex flex-col gap-4`}
        >
            <div className="flex justify-between items-start gap-3">
                <div className="flex flex-col gap-2 max-w-[70%]">
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">
                        Aeropuerto {airport.airport_name}
                    </h3>
                    <p className="text-sm md:text-base text-slate-200">
                        {city}, {airport.country_name}
                    </p>
                </div>

                <div className={styles.icon}>
                    <Image
                        src={planeIcon}
                        alt="Ver detalles del aeropuerto"
                        width={24}
                        height={24}
                    />
                </div>
            </div>

            <div className="mt-auto pt-3">
                <span className={styles.iataCode}>{mainCode}</span>
            </div>
        </Card>
    );
}
