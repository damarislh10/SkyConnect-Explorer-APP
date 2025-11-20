/**
 * Componente Header con título y toggle de tema
 */

'use client';

import { useThemeStore } from '@/store/theme-store';
import styles from './Header.module.scss';

export function Header() {
    const { theme, toggleTheme } = useThemeStore();


    return (
        <header className={`w-full py-4 sm:py-6 backdrop-blur-md sticky top-0 z-50 ${styles.header}`}>
            <div className="w-full px-4 sm:px-6 flex justify-end items-center">
                <button
                    className={`w-11 h-11 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-2xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg ${styles.themeToggle}`}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
}
