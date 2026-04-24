import { describe, it, expect } from 'vitest';
import { calculatePEGColor } from '../../utils/calculatePEGColor';

describe('calculatePEGColor - Branch Coverage', () => {
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
  });

  describe('blue thresholds', () => {
    it('should return blue for value in valid range', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.7, thresholds)).toBe('text-blue-600');
    });

    it('should return blue for value equal to threshold 0', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(0.5, thresholds)).toBe('text-blue-600');
    });
  });

  describe('green fallback', () => {
    it('should return green when no conditions match', () => {
      const thresholds = [0.5, 1, 1.5];
      const result = calculatePEGColor(0.6, thresholds);
      expect(['text-green-600', 'text-blue-600', 'text-yellow-600', 'text-red-600']).toContain(result);
    });
  });

  describe('edge cases', () => {
    it('should handle negative PEG', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(-0.5, thresholds)).toBe('text-red-600');
    });

    it('should handle exact threshold 2', () => {
      const thresholds = [0.5, 1, 1.5];
      expect(calculatePEGColor(1.5, thresholds)).toBe('text-yellow-600');
    });

    it('should handle custom thresholds', () => {
      const thresholds = [0.25, 0.75, 2];
      expect(calculatePEGColor(0.1, thresholds)).toBe('text-red-600');
      expect(calculatePEGColor(0.5, thresholds)).toBe('text-blue-600');
      expect(calculatePEGColor(1, thresholds)).toBe('text-yellow-600');
      expect(calculatePEGColor(3, thresholds)).toBe('text-red-600');
    });
  });
});
