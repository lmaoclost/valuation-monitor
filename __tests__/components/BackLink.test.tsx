import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BackLink } from '@/components/BackLink';
import { useLocale } from 'next-intl';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children}</a>
  ),
}));

describe('BackLink', () => {
  it('renders "← Voltar" in pt-BR locale', () => {
    vi.mocked(useLocale).mockReturnValue('pt-BR');
    render(<BackLink />);
    expect(screen.getByText('← Voltar')).toBeInTheDocument();
  });

  it('renders "← Back" in en locale', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<BackLink />);
    expect(screen.getByText('← Back')).toBeInTheDocument();
  });

  it('links to "/"', () => {
    vi.mocked(useLocale).mockReturnValue('pt-BR');
    render(<BackLink />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
