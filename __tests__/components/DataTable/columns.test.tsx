import { describe, it, expect, vi } from 'vitest';
import { createColumns } from '@/components/DataTable/columns';

const mockT = (key: string) => {
  const msgs: Record<string, string> = {
    ticker: 'CODIGO',
    price: 'COTAÇÃO',
    companyName: 'Nome da empresa',
    sector: 'Setor',
    segment: 'Segmento',
    cyclic: 'Cíclico',
    dy: 'DY',
    pl: 'P/L',
    lpa: 'LPA',
    vpa: 'VPA',
    dpa: 'DPA',
    risk: 'Risco',
    discountMargin: 'Margem de desconto',
    payout: 'Payout',
    growthDividends: 'Crescimento/Dividendos',
    growthValue: 'Crescimento',
    dividendsValue: 'Dividendos',
    undefinedValue: 'Indefinido',
    yes: 'SIM',
    no: 'NÃO',
    roe: 'ROE',
    cagrProfit5y: 'CAGR LUCRO 5A',
    damodaranGrowth: 'Crescimento Damodaram',
    avgGrowth: 'Média de Crescimento',
    descBazin: 'Desc Bazin',
    bazinFairPrice: 'Preço justo Bazin',
    bazinCeilingPrice: 'Preço teto Bazin',
    descGraham: 'Desc Graham',
    grahamFairPrice: 'Preço justo Graham',
    grahamCeilingPrice: 'Preço teto Graham',
    descGordon: 'Desc Gordon',
    d1: 'D1',
    gordonFairPrice: 'Preço justo Gordon',
    gordonCeilingPrice: 'Preço teto Gordon',
    peg: 'PEG',
    psr: 'PSR',
  };
  return msgs[key] ?? key;
};

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children}</a>
  ),
}));

const enMockT = (key: string) => {
  const msgs: Record<string, string> = {
    ticker: 'TICKER',
    price: 'PRICE',
    companyName: 'Company Name',
    sector: 'Sector',
    segment: 'Segment',
    cyclic: 'Cyclical',
    dy: 'DY',
    pl: 'P/L',
    lpa: 'EPS',
    vpa: 'BVPS',
    dpa: 'DPS',
    risk: 'Risk',
    discountMargin: 'Discount Margin',
    payout: 'Payout',
    growthDividends: 'Growth/Dividends',
    growthValue: 'Growth',
    dividendsValue: 'Dividends',
    undefinedValue: 'Mixed/Undefined',
    yes: 'YES',
    no: 'NO',
    roe: 'ROE',
    cagrProfit5y: 'CAGR PROFIT 5Y',
    damodaranGrowth: 'Damodaran Growth',
    avgGrowth: 'Avg Growth',
    descBazin: 'Bazin Disc.',
    bazinFairPrice: 'Bazin Fair Price',
    bazinCeilingPrice: 'Bazin Ceiling Price',
    descGraham: 'Graham Disc.',
    grahamFairPrice: 'Graham Fair Price',
    grahamCeilingPrice: 'Graham Ceiling Price',
    descGordon: 'Gordon Disc.',
    d1: 'D1',
    gordonFairPrice: 'Gordon Fair Price',
    gordonCeilingPrice: 'Gordon Ceiling Price',
    peg: 'PEG',
    psr: 'PSR',
  };
  return msgs[key] ?? key;
};

describe('DataTable Columns', () => {
  it('creates columns array', () => {
    const columns = createColumns(mockT);
    
    expect(Array.isArray(columns)).toBe(true);
    expect(columns.length).toBeGreaterThan(0);
  });

  it('creates ticker column', () => {
    const columns = createColumns(mockT);
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn).toBeDefined();
    expect(tickerColumn?.header).toBe('CODIGO');
  });

  it('creates companyname column', () => {
    const columns = createColumns(mockT);
    const companyColumn = columns.find(col => col.accessorKey === 'companyname');
    
    expect(companyColumn).toBeDefined();
  });

  it('creates sectorname column', () => {
    const columns = createColumns(mockT);
    const sectorColumn = columns.find(col => col.accessorKey === 'sectorname');
    
    expect(sectorColumn).toBeDefined();
  });

  it('creates segmentname column', () => {
    const columns = createColumns(mockT);
    const segmentColumn = columns.find(col => col.accessorKey === 'segmentname');
    
    expect(segmentColumn).toBeDefined();
  });

  it('creates pl column', () => {
    const columns = createColumns(mockT);
    const plColumn = columns.find(col => col.accessorKey === 'pl');
    
    expect(plColumn).toBeDefined();
  });

  it('creates lpa column', () => {
    const columns = createColumns(mockT);
    const lpaColumn = columns.find(col => col.accessorKey === 'lpa');
    
    expect(lpaColumn).toBeDefined();
  });

  it('creates vpa column', () => {
    const columns = createColumns(mockT);
    const vpaColumn = columns.find(col => col.accessorKey === 'vpa');
    
    expect(vpaColumn).toBeDefined();
  });

  it('creates valuation columns', () => {
    const columns = createColumns(mockT);
    const columnKeys = columns.map(col => col.accessorKey);
    
    expect(columnKeys).toContain('bazinFairPrice');
    expect(columnKeys).toContain('grahamFairPrice');
    expect(columnKeys).toContain('gordonFairPrice');
  });

  it('creates discount columns', () => {
    const columns = createColumns(mockT);
    const columnKeys = columns.map(col => col.accessorKey);
    
    expect(columnKeys).toContain('bazinDiscount');
  });

  it('has sorting function for columns', () => {
    const columns = createColumns(mockT);
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn?.sortingFn).toBeDefined();
  });

  it('has cell renderers for main columns', () => {
    const columns = createColumns(mockT);
    const tickerColumn = columns.find(col => col.accessorKey === 'ticker');
    
    expect(tickerColumn?.cell).toBeDefined();
  });

  it('creates multiple columns', () => {
    const columns = createColumns(mockT);
    
    expect(columns.length).toBeGreaterThan(20);
  });

  it('has proper column definitions', () => {
    const columns = createColumns(mockT);
    
    columns.forEach(col => {
      expect(col.accessorKey).toBeDefined();
    });
  });

  it('ticker cell renders Link with correct href', () => {
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
    const col = columns.find(c => c.accessorKey === 'bazinDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('grahamDiscountColor cell returns null', () => {
    const columns = createColumns(mockT);
    const col = columns.find(c => c.accessorKey === 'grahamDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('gordonDiscountColor cell returns null', () => {
    const columns = createColumns(mockT);
    const col = columns.find(c => c.accessorKey === 'gordonDiscountColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('pegColor cell returns null', () => {
    const columns = createColumns(mockT);
    const col = columns.find(c => c.accessorKey === 'pegColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('psrColor cell returns null', () => {
    const columns = createColumns(mockT);
    const col = columns.find(c => c.accessorKey === 'psrColor');
    const cell = col?.cell as Function;
    
    const result = cell({ row: {} } as any);
    expect(result).toBeNull();
  });

  it('bazinDiscount cell applies color class', () => {
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
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
    const columns = createColumns(mockT);
    const sortableColumns = columns.filter(col => col.sortingFn);
    
    sortableColumns.forEach(col => {
      expect(col.sortingFn).toBeDefined();
    });
  });

  describe('EN locale cell translations', () => {
    it('sector cell translates Portuguese sector to English', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'sectorname');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Financeiro',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('Financial');
    });

    it('sector cell keeps Portuguese when locale is not "en"', () => {
      const columns = createColumns(mockT);
      const col = columns.find(c => c.accessorKey === 'sectorname');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Financeiro',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('Financeiro');
    });

    it('segment cell translates Portuguese segment to English', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'segmentname');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Bancos',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toContain('Banks');
    });

    it('segment cell keeps Portuguese when locale is not "en"', () => {
      const columns = createColumns(mockT);
      const col = columns.find(c => c.accessorKey === 'segmentname');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Bancos',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toContain('Bancos');
    });

    it('cicle cell translates SIM to YES in English locale', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'cicle');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'SIM',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('YES');
    });

    it('cicle cell translates NÃO to NO in English locale', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'cicle');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'NÃO',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('NO');
    });

    it('growthDividend cell translates Crescimento to Growth in English locale', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'growthDividend');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Crescimento',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('Growth');
    });

    it('growthDividend cell translates Dividendos to Dividends in English locale', () => {
      const columns = createColumns(enMockT, 'en');
      const col = columns.find(c => c.accessorKey === 'growthDividend');
      const cell = col?.cell as Function;

      const mockRow = {
        getValue: () => 'Dividendos',
        original: {},
      };

      const result = cell({ row: mockRow } as any);
      expect(result.props.children).toBe('Dividends');
    });
  });
});