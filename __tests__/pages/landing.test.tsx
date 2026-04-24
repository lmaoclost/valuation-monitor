import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Providers } from '@/app/providers';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => <a href={href} {...props}>{children}</a>,
}));

describe('Landing Page', () => {
  it('renders within Providers', () => {
    render(
      <Providers>
        <div data-testid="landing-root">
          <header className="font-display text-xl tracking-widest">
            VALUATION MONITOR
          </header>
          <h1 className="font-display text-5xl">Radar fundamentalista</h1>
          <div className="font-body text-lg">Dados atualizados daily</div>
          <button className="font-display text-lg">Iniciar Analise</button>
          <div className="font-mono text-xs">ferramenta de apoio a_decisao</div>
        </div>
      </Providers>
    );
    
    expect(screen.getByTestId('landing-root')).toBeInTheDocument();
  });

  it('renders header with VALUATION MONITOR', () => {
    render(
      <Providers>
        <div className="font-display text-xl">VALUATION MONITOR</div>
        <a href="/br-stocks" className="font-mono text-sm">Acessar</a>
      </Providers>
    );
    
    expect(screen.getByText('VALUATION MONITOR')).toBeInTheDocument();
    expect(screen.getByText('Acessar')).toBeInTheDocument();
  });

  it('renders valuation method cards', () => {
    render(
      <Providers>
        <div>
          <div className="font-display text-xl">Metodo Bazin</div>
          <div className="font-display text-xl">Modelo Graham</div>
          <div className="font-display text-xl">Modelo Gordon</div>
        </div>
      </Providers>
    );
    
    expect(screen.getByText('Metodo Bazin')).toBeInTheDocument();
    expect(screen.getByText('Modelo Graham')).toBeInTheDocument();
    expect(screen.getByText('Modelo Gordon')).toBeInTheDocument();
  });

  it('renders como funciona section', () => {
    render(
      <Providers>
        <div>
          <h2 className="font-display text-3xl">Como funciona</h2>
          <div className="font-display text-xl">Dados atualizados daily</div>
        </div>
      </Providers>
    );
    
    expect(screen.getByText('Como funciona')).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(
      <Providers>
        <div>
          <button className="font-display text-lg">Iniciar Analise</button>
        </div>
      </Providers>
    );
    
    expect(screen.getByText('Iniciar Analise')).toBeInTheDocument();
  });

  it('links have correct href attributes', () => {
    render(
      <Providers>
        <a href="/br-stocks" data-testid="main-link">Link</a>
      </Providers>
    );
    
    const link = screen.getByTestId('main-link');
    expect(link).toHaveAttribute('href', '/br-stocks');
  });

  it('has grain overlay class', () => {
    render(
      <Providers>
        <div className="grain" data-testid="grain" />
      </Providers>
    );
    
    expect(screen.getByTestId('grain')).toHaveClass('grain');
  });

  it('has float animation class', () => {
    render(
      <Providers>
        <div className="animate-float" data-testid="float" />
      </Providers>
    );
    
    expect(screen.getByTestId('float')).toHaveClass('animate-float');
  });
});