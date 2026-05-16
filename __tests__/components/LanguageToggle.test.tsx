import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLocale } from 'next-intl';
import * as cookies from '@/lib/cookies';

vi.mock('@/lib/cookies', () => ({
  setCookie: vi.fn(),
}));

describe('LanguageToggle', () => {
  beforeEach(() => {
    vi.mocked(useLocale).mockReturnValue('pt-BR');
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true,
    });
  });

  it('renders "EN" button in pt-BR locale', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('renders "PT" button in en locale', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageToggle />);
    expect(screen.getByText('PT')).toBeInTheDocument();
  });

  it('renders correct title in pt-BR locale', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('EN')).toHaveAttribute('title', 'Switch to English');
  });

  it('renders correct title in en locale', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageToggle />);
    expect(screen.getByText('PT')).toHaveAttribute('title', 'Mudar para Português');
  });

  it('sets cookie and reloads on click in pt-BR locale', () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByText('EN'));
    expect(cookies.setCookie).toHaveBeenCalledWith('NEXT_LOCALE', 'en');
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('sets cookie and reloads on click in en locale', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageToggle />);
    fireEvent.click(screen.getByText('PT'));
    expect(cookies.setCookie).toHaveBeenCalledWith('NEXT_LOCALE', 'pt-BR');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
