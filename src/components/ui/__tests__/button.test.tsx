/**
 * Tests para componentes UI
 * Ejemplo de test para el componente Button
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies primary variant styles by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByText('Primary');
        expect(button).toHaveClass('bg-blue-600');
    });

    it('applies secondary variant styles when specified', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByText('Secondary');
        expect(button).toHaveClass('bg-gray-200');
    });
});

