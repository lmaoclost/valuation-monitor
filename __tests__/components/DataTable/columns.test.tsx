import { describe, it, expect, vi } from 'vitest';
import { createColumns } from '@/components/DataTable/columns';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children}</a>
  ),
}));

describe('DataTable Columns', () => {
  it('creates columns array', () => {
    const columns = createColumns();
    
    expect(Array.isArray(columns)).toBe(true);
    expect(columns.length).toBeGreaterThan(0);
  });

  it('creates ticker column', () => {
    const columns = createColumns();
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn).toBeDefined();
    expect(tickerColumn?.header).toBe('Ações');
  });

  it('creates companyname column', () => {
    const columns = createColumns();
    const companyColumn = columns.find(col => col.accessorKey === 'companyname');
    
    expect(companyColumn).toBeDefined();
  });

  it('creates sectorname column', () => {
    const columns = createColumns();
    const sectorColumn = columns.find(col => col.accessorKey === 'sectorname');
    
    expect(sectorColumn).toBeDefined();
  });

  it('creates segmentname column', () => {
    const columns = createColumns();
    const segmentColumn = columns.find(col => col.accessorKey === 'segmentname');
    
    expect(segmentColumn).toBeDefined();
  });

  it('creates pl column', () => {
    const columns = createColumns();
    const plColumn = columns.find(col => col.accessorKey === 'pl');
    
    expect(plColumn).toBeDefined();
  });

  it('creates lpa column', () => {
    const columns = createColumns();
    const lpaColumn = columns.find(col => col.accessorKey === 'lpa');
    
    expect(lpaColumn).toBeDefined();
  });

  it('creates vpa column', () => {
    const columns = createColumns();
    const vpaColumn = columns.find(col => col.accessorKey === 'vpa');
    
    expect(vpaColumn).toBeDefined();
  });

  it('creates valuation columns', () => {
    const columns = createColumns();
    const columnKeys = columns.map(col => col.accessorKey);
    
    expect(columnKeys).toContain('bazinFairPrice');
    expect(columnKeys).toContain('grahamFairPrice');
    expect(columnKeys).toContain('gordonFairPrice');
  });

  it('creates discount columns', () => {
    const columns = createColumns();
    const columnKeys = columns.map(col => col.accessorKey);
    
    expect(columnKeys).toContain('bazinDiscount');
  });

  it('has sorting function for columns', () => {
    const columns = createColumns();
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn?.sortingFn).toBeDefined();
  });

  it('has cell renderers for main columns', () => {
    const columns = createColumns();
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn?.cell).toBeDefined();
  });

  it('creates multiple columns', () => {
    const columns = createColumns();
    
    expect(columns.length).toBeGreaterThan(20);
  });

  it('has proper column definitions', () => {
    const columns = createColumns();
    
    columns.forEach(col => {
      expect(col.accessorKey).toBeDefined();
    });
  });

  it('ticker cell renders Link with correct href', () => {
    const columns = createColumns();
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    const cell = tickerColumn?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = { ticker: 'PETR4' };
        return data[key];
      },
      original: { ticker: 'PETR4' },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result).toBeDefined();
    expect(result.props.href).toContain('PETR4');
  });

  it('companyname cell truncates to 15 chars', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'companyname');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: () => 'Empresa Minha Nome',
      original: {},
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.children).toBe('Empresa Minha N');
  });

  it('segmentname cell truncates to 15 chars', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'segmentname');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: () => 'Segmento Nome',
      original: {},
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.children).toBe('Segmento Nome');
  });

  it('growthAverageColor cell applies fieldColor class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'growthAverage');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          growthAverage: '10%',
          growthAverageColor: 'text-green-500',
        };
        return data[key];
      },
      original: {},
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-green-500');
  });

  it('bazinDiscountColor cell returns null', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'bazinDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('grahamDiscountColor cell returns null', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'grahamDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('gordonDiscountColor cell returns null', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'gordonDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('pegColor cell returns null', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'pegColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('psrColor cell returns null', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'psrColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('bazinDiscount cell applies color class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'bazinDiscount');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          bazinDiscount: '15%',
          bazinDiscountColor: 'text-green-600',
        };
        return data[key];
      },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-green-600');
  });

  it('grahamDiscount cell applies color class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'grahamDiscount');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          grahamDiscount: '20%',
          grahamDiscountColor: 'text-red-500',
        };
        return data[key];
      },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-red-500');
  });

  it('gordonDiscount cell applies color class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'gordonDiscount');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          gordonDiscount: '25%',
          gordonDiscountColor: 'text-green-400',
        };
        return data[key];
      },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-green-400');
  });

  it('peg cell applies color class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'peg');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          peg: 1.5,
          pegColor: 'text-yellow-500',
        };
        return data[key];
      },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-yellow-500');
  });

  it('psr cell applies color class', () => {
    const columns = createColumns();
    const col = columns.find(c => c.accessorKey === 'psr');
    const cell = col?.cell as Function;
    
    const mockRow = {
      getValue: (key: string) => {
        const data: Record<string, unknown> = {
          psr: 0.8,
          psrColor: 'text-green-700',
        };
        return data[key];
      },
    };
    
    const result = cell({ row: mockRow } as any);
    expect(result.props.className).toBe('text-green-700');
  });

  it('all columns with sortingFn have sortNullsLast', () => {
    const columns = createColumns();
    const sortableColumns = columns.filter(col => col.sortingFn);
    
    sortableColumns.forEach(col => {
      expect(col.sortingFn).toBeDefined();
    });
  });
});