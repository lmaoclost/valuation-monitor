import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableWrapper } from '@/components/TableWrapper';

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

// Mock actions
vi.mock('@/app/actions/stock.actions', () => ({
  getStocksAndComplementary: vi.fn(),
  getPresetStocks: vi.fn(),
}));

// Mock DataTable component
vi.mock('@/components/DataTable', () => ({
  DataTable: ({ data, columns }: Record<string, any>) => (
    <div data-testid="data-table">
      <div>{data.length} rows</div>
      <div>{columns.length} columns</div>
    </div>
  ),
}));

// Mock columns
vi.mock('@/components/DataTable/columns', () => ({
  createColumns: vi.fn(() => [
    { accessorKey: 'ticker' },
    { accessorKey: 'price' },
    { accessorKey: 'dy' },
  ]),
}));

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

describe('TableWrapper Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    vi.mocked(useQuery).mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });

  it('should render DataTable when data loads', async () => {
    const mockData = {
      stocks: [
        { ticker: 'PETR4', price: 25.5, dy: '5%' },
        { ticker: 'VALE5', price: 65.0, dy: '8%' },
      ],
      comp: {
        risk: '8%',
        ipca: '4.5%',
        erp: '7.5%',
      },
    };

    vi.mocked(useQuery).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);

    await waitFor(() => {
      expect(screen.getByTestId('data-table')).toBeInTheDocument();
    });
  });

  it('should display correct number of rows', async () => {
    const mockData = {
      stocks: [
        { ticker: 'PETR4' },
        { ticker: 'VALE5' },
        { ticker: 'ITUB4' },
      ],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    vi.mocked(useQuery).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);

    await waitFor(() => {
      expect(screen.getByText('3 rows')).toBeInTheDocument();
    });
  });

  it('should render loading state during preset mutation', async () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4' }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    vi.mocked(useQuery).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: true, // Loading during preset application
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);

    await waitFor(() => {
      expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
    });
  });

  it('should handle empty data gracefully', async () => {
    const mockData = {
      stocks: [],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    vi.mocked(useQuery).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);

    await waitFor(() => {
      expect(screen.getByText('0 rows')).toBeInTheDocument();
    });
  });

  it('should create memoized columns', async () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4' }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    vi.mocked(useQuery).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);

    vi.mocked(useMutation).mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    vi.mocked(useQueryClient).mockReturnValueOnce({} as any);

    render(<TableWrapper />);

    await waitFor(() => {
      expect(screen.getByText('3 columns')).toBeInTheDocument();
    });
  });
});
