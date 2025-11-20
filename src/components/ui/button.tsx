
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    styles.button,
                    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
                    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

