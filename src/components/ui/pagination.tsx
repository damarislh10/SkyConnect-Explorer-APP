/**
 * Componente de Paginación
 */

import styles from './Pagination.module.scss';
import { cn } from '@/lib/utils';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Mostrar solo páginas cercanas a la actual
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 3) return pages.slice(0, 5);
        if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);

        return pages.slice(currentPage - 3, currentPage + 2);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={cn("flex items-center justify-center gap-2 flex-wrap", className)}>
            <button
                className={cn(
                    "px-4 py-2 min-w-[100px] rounded-lg border transition-all duration-200",
                    "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                    "text-gray-900 dark:text-gray-100",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                    styles.button
                )}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                Anterior
            </button>

            <div className="flex gap-1">
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={cn(
                            "px-3 py-2 min-w-[40px] rounded-lg border transition-all duration-200",
                            "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                            "text-gray-900 dark:text-gray-100",
                            "hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md",
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
                    "px-4 py-2 min-w-[100px] rounded-lg border transition-all duration-200",
                    "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                    "text-gray-900 dark:text-gray-100",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                    styles.button
                )}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
            >
                Siguiente
            </button>
        </div>
    );
}

