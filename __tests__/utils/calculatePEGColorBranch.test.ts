import { describe, it, expect } from 'vitest';
import { calculatePEGColor } from '../../utils/calculatePEGColor';

describe('calculatePEGColor - Branch Coverage', () => {
  describe('green thresholds', () => {
    it('should return green for value in valid range', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.7, thresholds)).toBe('text-green-600');
    });

    it('should return green for value equal to threshold 0', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.5, thresholds)).toBe('text-green-600');
    });

    it('should return green for value just below threshold 1', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.99, thresholds)).toBe('text-green-600');
    });
  });

  describe('red thresholds', () => {
    it('should return red for very low PEG values', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.3, thresholds)).toBe('text-red-600');
    });

    it('should return red for values above threshold 2', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(2, thresholds)).toBe('text-red-600');
    });

    it('should return red for very high PEG values', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(10, thresholds)).toBe('text-red-600');
    });

    it('should return red for zero PEG', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0, thresholds)).toBe('text-red-600');
    });

    it('should return red for negative PEG', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(-0.5, thresholds)).toBe('text-red-600');
    });
  });

  describe('yellow thresholds', () => {
    it('should return yellow for value >= threshold 1', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(1, thresholds)).toBe('text-yellow-600');
    });

    it('should return yellow for value between threshold 1 and 2', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(1.2, thresholds)).toBe('text-yellow-600');
    });

    it('should return yellow for value just below threshold 2', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(1.49, thresholds)).toBe('text-yellow-600');
    });
  });

  describe('blue fallback', () => {
    it('should return blue for exact threshold 2 boundary', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(1.5, thresholds)).toBe('text-blue-600');
    });
  });

  describe('custom thresholds', () => {
    it('should handle custom thresholds', () => {
      const thresholds = [0.25, 0.75, 2];
      expect(calculatePEGColor(0.1, thresholds)).toBe('text-red-600');
      expect(calculatePEGColor(0.25, thresholds)).toBe('text-green-600');
      expect(calculatePEGColor(1, thresholds)).toBe('text-yellow-600');
      expect(calculatePEGColor(2, thresholds)).toBe('text-blue-600');
      expect(calculatePEGColor(3, thresholds)).toBe('text-red-600');
    });
  });
});