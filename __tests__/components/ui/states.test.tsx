import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState, ErrorState } from '@/components/ui/states';

describe('LoadingState', () => {
  it('renders loading message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });
});

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<ErrorState error={new Error('Algo deu errado')} />);
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });
});
