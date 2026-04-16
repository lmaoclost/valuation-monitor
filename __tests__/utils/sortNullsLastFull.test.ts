import { describe, it, expect } from 'vitest';
import { sortNullsLast } from '../../utils/sortNullsLast';
import { StocksFormattedDataType } from '@/@types/StocksFormattedDataType';

describe('sortNullsLast - Complete Coverage', () => {
  // Mock row structure for testing
  const createMockRow = (value: any) => ({
    getValue: (columnId: string) => value,
  });

  it('should sort null values to the end', () => {
    const rowA = createMockRow(null);
    const rowB = createMockRow('100');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'price'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should sort empty strings to the end', () => {
    const rowA = createMockRow('');
    const rowB = createMockRow('50');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'price'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should parse currency format correctly', () => {
    const rowA = createMockRow('R$ 100,50');
    const rowB = createMockRow('R$ 50,25');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'price'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should parse percentage format correctly', () => {
    const rowA = createMockRow('25.5%');
    const rowB = createMockRow('10.2%');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'percentage'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should handle dot as thousands separator', () => {
    const rowA = createMockRow('1.000,50');
    const rowB = createMockRow('500,25');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should sort numeric strings in ascending order', () => {
    const rowA = createMockRow('100');
    const rowB = createMockRow('200');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(result).toBeLessThan(0);
  });

  it('should handle both rows as null', () => {
    const rowA = createMockRow(null);
    const rowB = createMockRow(null);
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(result).toBe(0);
  });

  it('should handle invalid number strings', () => {
    const rowA = createMockRow('abc');
    const rowB = createMockRow('123');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(typeof result).toBe('number');
  });

  it('should handle whitespace trimming', () => {
    const rowA = createMockRow('  100,50  ');
    const rowB = createMockRow('50,25');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(result).toBeGreaterThan(0);
  });

  it('should handle negative numbers', () => {
    const rowA = createMockRow('-50');
    const rowB = createMockRow('50');
    const result = sortNullsLast(
      rowA as any,
      rowB as any,
      'value'
    );
    expect(result).toBeLessThan(0);
  });
});
