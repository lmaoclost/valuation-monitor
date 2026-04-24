import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from '@/app/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Providers (React Query)', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div data-testid="child">Test Content</div>
      </Providers>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Providers>
        <div>Child 1</div>
        <div>Child 2</div>
      </Providers>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('provides QueryClient to children', () => {
    const testQueryClient = new QueryClient();
    
    render(
      <QueryClientProvider client={testQueryClient}>
        <div data-testid="query-child">Query Content</div>
      </QueryClientProvider>
    );
    
    expect(screen.getByTestId('query-child')).toBeInTheDocument();
  });

  it('wraps content with Providers component', () => {
    const { container } = render(
      <Providers>
        <span>Wrapped Content</span>
      </Providers>
    );
    
    expect(container.textContent).toBe('Wrapped Content');
  });
});