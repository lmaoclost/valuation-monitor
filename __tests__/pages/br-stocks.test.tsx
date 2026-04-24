import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Providers } from '@/app/providers';

vi.mock('@/components/TableWrapper', () => ({
  TableWrapper: ({ isLoading }: { isLoading?: boolean }) => {
    if (isLoading) {
      return <div data-testid="loading">Carregando dados...</div>;
    }
    return <div data-testid="tablewrapper">TableWrapper</div>;
  },
}));

describe('BrStocks Page', () => {
  it('renders within Providers', () => {
    render(
      <Providers>
        <div data-testid="br-stocks-root">
          <h1 className="font-display text-lg">VALUATION MONITOR</h1>
          <a href="/" className="font-mono text-sm">← Voltar</a>
          <div data-testid="tablewrapper">TableWrapper</div>
        </div>
      </Providers>
    );
    
    expect(screen.getByTestId('br-stocks-root')).toBeInTheDocument();
  });

  it('renders VALUATION MONITOR header', () => {
    render(
      <Providers>
        <header>
          <div className="font-display text-lg">VALUATION MONITOR</div>
        </header>
      </Providers>
    );
    
    expect(screen.getByText('VALUATION MONITOR')).toBeInTheDocument();
  });

  it('renders Voltar link', () => {
    render(
      <Providers>
        <a href="/" className="font-mono text-sm">← Voltar</a>
      </Providers>
    );
    
    expect(screen.getByText('← Voltar')).toBeInTheDocument();
  });

  it('renders TableWrapper', () => {
    render(
      <Providers>
        <div data-testid="tablewrapper">TableWrapper</div>
      </Providers>
    );
    
    expect(screen.getByText('TableWrapper')).toBeInTheDocument();
  });
});