
'use client';

import { useState, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { cn } from '@/lib/utils';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 3) return pages.slice(0, 5);
        if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);

        return pages.slice(currentPage - 3, currentPage + 2);
    };

    const getMobileVisiblePages = () => {
        if (totalPages <= 3) return pages;

        // En móvil, mostrar máximo 3 páginas alrededor de la actual
        if (currentPage <= 2) return pages.slice(0, 3);
        if (currentPage >= totalPages - 1) return pages.slice(totalPages - 3);
        return pages.slice(currentPage - 2, currentPage + 1);
    };

    const visiblePages = isMobile ? getMobileVisiblePages() : getVisiblePages();

    return (
        <div className={cn("flex items-center justify-center gap-0.5 sm:gap-2 flex-wrap", styles.paginationWrapper, className)}>
            <button
                className={cn(
                    "px-2 py-1.5 sm:px-4 sm:py-2 min-w-[60px] sm:min-w-[100px] rounded-lg transition-all duration-200 text-xs sm:text-base",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    "disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                    styles.button
                )}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                <span className="hidden sm:inline">Anterior</span>
                <span className="sm:hidden">Ant</span>
            </button>

            <div className="flex gap-0.5 sm:gap-1">
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={cn(
                            "px-1.5 py-1.5 sm:px-3 sm:py-2 min-w-[28px] sm:min-w-[40px] rounded-lg transition-all duration-200 text-xs sm:text-base",
                            "hover:-translate-y-0.5 hover:shadow-md",
                            currentPage === page && styles.active,
                            styles.pageButton
                        )}
                        onClick={() => onPageChange(page)}
                        aria-label={`Ir a página ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={cn(
                    "px-2 py-1.5 sm:px-4 sm:py-2 min-w-[60px] sm:min-w-[100px] rounded-lg transition-all duration-200 text-xs sm:text-base",
                    "hover:-translate-y-0.5 hover:shadow-md",
                    "disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                    styles.button
                )}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
            >
                <span className="hidden sm:inline">Siguiente</span>
                <span className="sm:hidden">Sig</span>
            </button>
        </div>
    );
}

