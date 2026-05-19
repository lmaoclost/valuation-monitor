import { describe, it, expect } from 'vitest';
import { calculatePSRColor } from '@/utils/calculatePSRColor';

describe('calculatePSRColor', () => {
  it('should return red when value exceeds threshold', () => {
    const result = calculatePSRColor(3, [2]);
    expect(result).toBe('text-red-600');
  });

  it('should return yellow when value equals threshold', () => {
    const result = calculatePSRColor(2, [2]);
    expect(result).toBe('text-yellow-600');
  });

  it('should return green when value is less than threshold', () => {
    const result = calculatePSRColor(1, [2]);
    expect(result).toBe('text-green-600');
  });

  it('should work with multiple thresholds', () => {
    const result = calculatePSRColor(1, [2, 3, 4]);
    expect(result).toBe('text-green-600');
  });
});
