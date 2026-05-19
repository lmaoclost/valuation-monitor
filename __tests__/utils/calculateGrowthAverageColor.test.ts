import { describe, it, expect } from 'vitest';
import { calculateGrowthAverageColor } from '@/utils/calculateGrowthAverageColor';

describe('calculateGrowthAverageColor', () => {
  const thresholds = [0, 0.1, 0.2];

  it('should return red when growth is negative', () => {
    const result = calculateGrowthAverageColor(-0.05, thresholds);
    expect(result).toBe('text-red-600');
  });

  it('should return yellow when growth is between thresholds', () => {
    const result = calculateGrowthAverageColor(0.05, thresholds);
    expect(result).toBe('text-yellow-600');
  });

  it('should return green when growth exceeds second threshold', () => {
    const result = calculateGrowthAverageColor(0.15, thresholds);
    expect(result).toBe('text-green-600');
  });

  it('should return green when growth equals second threshold', () => {
    const result = calculateGrowthAverageColor(0.1, thresholds);
    expect(result).toBe('text-green-600');
  });
});
