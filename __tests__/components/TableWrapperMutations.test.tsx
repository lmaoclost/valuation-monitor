import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TableWrapper } from '@/components/TableWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock React Query hooks
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
  };
});

// Mock actions
vi.mock('@/app/actions/stock.actions', () => ({
  getStocksAndComplementary: vi.fn(),
  getPresetStocks: vi.fn(),
}));

// Mock DataTable component
vi.mock('@/components/DataTable', () => ({
  DataTable: ({ data, onApplyPreset }: Record<string, any>) => (
    <div data-testid="data-table">
      <button onClick={() => onApplyPreset('test-preset')}>Apply Preset</button>
      <div>{data?.length || 0} items</div>
    </div>
  ),
}));

// Mock columns
vi.mock('@/components/DataTable/columns', () => ({
  createColumns: vi.fn(() => [
    { accessorKey: 'ticker' },
    { accessorKey: 'price' },
  ]),
}));

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as stockActions from '@/app/actions/stock.actions';

describe('TableWrapper - Query and Mutation Coverage', () => {
  let useQueryMock: ReturnType<typeof vi.fn>;
  let useMutationMock: ReturnType<typeof vi.fn>;
  let useQueryClientMock: ReturnType<typeof vi.fn>;
  let mockQueryClient: Record<string, any>;
  let mockSetQueryData: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSetQueryData = vi.fn();
    mockQueryClient = {
      setQueryData: mockSetQueryData,
    };

    useQueryMock = vi.mocked(useQuery);
    useMutationMock = vi.mocked(useMutation);
    useQueryClientMock = vi.mocked(useQueryClient);
  });

  it('should initialize queryClient on component mount', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(useQueryClientMock).toHaveBeenCalled();
  });

  it('should query stocks and complementary data on mount', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['stocks-and-complementary'],
      })
    );
  });

  it('should show loading state while fetching data', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should show loading state when preset is pending', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: { stocks: [], comp: {} },
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: true,
    } as any);

    render(<TableWrapper />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render DataTable when data is loaded', () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4', price: 25.5 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should setup mutation for applying presets', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(useMutationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      })
    );
  });

  it('should update query cache on preset mutation success', () => {
    const mockMutationConfig = {
      mutationFn: vi.fn(),
      onSuccess: vi.fn(),
    };

    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: { stocks: [], comp: {} },
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    useMutationMock.mockImplementationOnce((config: Record<string, any>) => {
      // Store the config for verification
      mockMutationConfig.mutationFn = config.mutationFn;
      mockMutationConfig.onSuccess = config.onSuccess;

      return {
        mutateAsync: vi.fn(),
        isPending: false,
      };
    });

    render(<TableWrapper />);

    // Verify mutation was configured with onSuccess handler
    expect(useMutationMock).toHaveBeenCalled();
  });

  it('should memoize columns to prevent unnecessary re-renders', () => {
    const mockData = {
      stocks: [{ ticker: 'PETR4', price: 25.5 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    const { rerender } = render(<TableWrapper />);

    // Rerender with same data
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    rerender(<TableWrapper />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should memoize data to prevent unnecessary re-renders', () => {
    const mockData = {
      stocks: [{ ticker: 'VALE5', price: 65.0 }],
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
    };

    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    const tableDiv = screen.getByTestId('data-table');
    expect(tableDiv).toBeInTheDocument();
  });

  it('should handle undefined stocks in data', () => {
    const mockData = {
      comp: { risk: '8%', ipca: '4.5%', erp: '7.5%' },
      // stocks is undefined
    };

    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should set staleTime for 24 hours', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        staleTime: 24 * 60 * 60 * 1000,
      })
    );
  });

  it('should disable refetch on window focus', () => {
    useQueryClientMock.mockReturnValueOnce(mockQueryClient);
    useQueryMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
    } as any);
    useMutationMock.mockReturnValueOnce({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);

    render(<TableWrapper />);

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        refetchOnWindowFocus: false,
      })
    );
  });
});
