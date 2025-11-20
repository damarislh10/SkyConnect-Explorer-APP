/**
 * Tests para utilidades de lib
 * Ejemplo de test para funciones de utils
 */

import { formatDate, cn } from '../utils';

describe('lib utilities', () => {
  describe('formatDate', () => {
    it('formats Date object correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('2024');
      expect(formatted).toContain('enero');
      expect(formatted).toContain('15');
    });

    it('formats date string correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('2024');
    });
  });

  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('filters out falsy values', () => {
      expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
    });

    it('returns empty string for no valid classes', () => {
      expect(cn(null, undefined, false)).toBe('');
    });
  });
});

