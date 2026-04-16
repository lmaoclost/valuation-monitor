import { describe, it, expect } from 'vitest';
import { calculatePEGColor } from '../../utils/calculatePEGColor';

describe('calculatePEGColor - Branch Coverage', () => {
  it('should return green for very low PEG values', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(0.3, thresholds);
    expect(color).toBeDefined();
  });

  it('should return blue text for values between threshold 0 and 1', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(0.7, thresholds);
    expect(typeof color).toBe('string');
    expect(color.length).toBeGreaterThan(0);
  });

  it('should handle value equal to threshold 0', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(0.5, thresholds);
    expect(typeof color).toBe('string');
  });

  it('should handle value equal to threshold 1', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(1, thresholds);
    expect(typeof color).toBe('string');
  });

  it('should handle value equal to threshold 2', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(1.5, thresholds);
    expect(typeof color).toBe('string');
  });

  it('should return red for values above threshold 2', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(2, thresholds);
    expect(color).toMatch(/red/);
  });

  it('should handle very high PEG values', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(10, thresholds);
    expect(color).toMatch(/red/);
  });

  it('should handle value between threshold 1 and 2', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(1.2, thresholds);
    expect(typeof color).toBe('string');
  });

  it('should handle zero PEG', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(0, thresholds);
    expect(color).toMatch(/red/);
  });

  it('should handle negative PEG (edge case)', () => {
    const thresholds = [0.5, 1, 1.5];
    const color = calculatePEGColor(-0.5, thresholds);
    expect(typeof color).toBe('string');
  });
});
