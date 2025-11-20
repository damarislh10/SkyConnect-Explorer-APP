
"use client";

import { useState } from "react";
import type { Airport } from "@/types";
import { AirportMap } from "./airport-map";
import { Card } from "@/components/ui/card";
import styles from "./AirportDetailsTabs.module.scss";

export interface AirportDetailsTabsProps {
    airport: Airport;
}

type Tab = "general" | "ubicacion" | "zona-horaria" | "estadisticas";

export function AirportDetailsTabs({ airport }: AirportDetailsTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>("general");

    const tabs: { id: Tab; label: string }[] = [
        { id: "general", label: "General" },
        { id: "ubicacion", label: "Ubicación" },
        { id: "zona-horaria", label: "Zona Horaria" },
        { id: "estadisticas", label: "Estadísticas" },
    ];

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabsHeader}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.tabContent}>
                {activeTab === "general" && (
                    <Card className={`${styles.detailsCard} px-6 py-5 md:px-8 md:py-6`}>
                        <div className={styles.contentSection}>
                            <h3 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>ℹ</span>
                                Información General
                            </h3>

                            <div className={styles.infoList}>
                                <p>
                                    <span className={styles.label}>Código IATA: </span>
                                    <span className={styles.value}>
                                        {airport.iata_code || "No disponible"}
                                    </span>
                                </p>
                                <p>
                                    <span className={styles.label}>Código ICAO: </span>
                                    <span className={styles.value}>
                                        {airport.icao_code || "No disponible"}
                                    </span>
                                </p>
                                <p>
                                    <span className={styles.label}>País: </span>
                                    <span className={styles.value}>
                                        {airport.country_name} ({airport.country_iso2})
                                    </span>
                                </p>
                                <p>
                                    <span className={styles.label}>Ciudad IATA: </span>
                                    <span className={styles.value}>
                                        {airport.city_iata_code || "No disponible"}
                                    </span>
                                </p>
                                <p>
                                    <span className={styles.label}>Teléfono: </span>
                                    <span className={styles.value}>
                                        {airport.phone_number || "No disponible"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === "ubicacion" && (
                    <Card className={`${styles.detailsCard} px-6 py-5 md:px-8 md:py-6`}>
                        <div className={styles.contentSection}>
                            <h3 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>📍</span>
                                Ubicación
                            </h3>

                            <div className={styles.infoList}>
                                <p>
                                    <span className={styles.label}>Latitud: </span>
                                    <span className={styles.value}>{airport.latitude}</span>
                                </p>
                                <p>
                                    <span className={styles.label}>Longitud: </span>
                                    <span className={styles.value}>{airport.longitude}</span>
                                </p>
                                <p>
                                    <span className={styles.label}>ID Geoname: </span>
                                    <span className={styles.value}>
                                        {airport.geoname_id || "No disponible"}
                                    </span>
                                </p>
                            </div>

                            <div className={styles.mapWrapper}>
                                <AirportMap airport={airport} />
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === "zona-horaria" && (
                    <Card className={`${styles.detailsCard} px-6 py-5 md:px-8 md:py-6`}>
                        <div className={styles.contentSection}>
                            <h3 className={styles.sectionTitle}>
                                Zona Horaria
                            </h3>

                            <div className={styles.infoList}>
                                <p>
                                    <span className={styles.label}>Zona Horaria: </span>
                                    <span className={styles.value}>
                                        {airport.timezone || "No disponible"}
                                    </span>
                                </p>
                                <p>
                                    <span className={styles.label}>GMT: </span>
                                    <span className={styles.value}>
                                        {airport.gmt || "No disponible"}
                                    </span>
                                </p>
                            </div>

                            <div className={styles.timeSection}>
                                <h4 className={styles.timeTitle}>
                                    Hora Local
                                </h4>
                                <p className={styles.localTime}>{formatDate(new Date())}</p>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === "estadisticas" && (
                    <Card className={`${styles.detailsCard} px-6 py-5 md:px-8 md:py-6`}>
                        <div className={styles.contentSection}>
                            <h3 className={styles.sectionTitle}>
                                Estadísticas
                            </h3>

                            <div className={styles.infoList}>
                                <p>
                                    <span className={styles.label}>ID del Aeropuerto: </span>
                                    <span className={styles.value}>{airport.airport_id}</span>
                                </p>
                                <p>
                                    <span className={styles.label}>Código de Ciudad: </span>
                                    <span className={styles.value}>
                                        {airport.city_iata_code || "No disponible"}
                                    </span>
                                </p>
                            </div>

                            <p className={styles.note}>
                                * Información adicional de estadísticas disponible según la API
                                de Aviationstack.
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
