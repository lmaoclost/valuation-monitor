import { describe, it, expect } from 'vitest';
import { calculateFieldColor } from '@/utils/calculateFieldColor';

describe('calculateFieldColor', () => {
  it('should return red when value below lower threshold', () => {
    expect(calculateFieldColor(-1, [0, 0.3])).toBe('text-red-600');
  });

  it('should return yellow when value equals lower threshold', () => {
    expect(calculateFieldColor(0, [0, 0.3])).toBe('text-yellow-600');
  });

  it('should return yellow when value between thresholds', () => {
    expect(calculateFieldColor(0.15, [0, 0.3])).toBe('text-yellow-600');
  });

  it('should return yellow when value equals upper threshold', () => {
    expect(calculateFieldColor(0.3, [0, 0.3])).toBe('text-yellow-600');
  });

  it('should return green when value above upper threshold', () => {
    expect(calculateFieldColor(0.5, [0, 0.3])).toBe('text-green-600');
  });

  it('should handle thresholds array with one element', () => {
    expect(calculateFieldColor(0.5, [0])).toBe('text-green-600');
    expect(calculateFieldColor(-1, [0])).toBe('text-red-600');
  });

  it('should handle empty thresholds array', () => {
    expect(calculateFieldColor(10, [])).toBe('text-green-600');
  });
});
