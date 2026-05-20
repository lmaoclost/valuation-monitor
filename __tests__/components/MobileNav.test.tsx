import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileNav } from '@/components/MobileNav';

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-trigger">{children}</div>,
  SheetContent: ({ children, side, className }: { children: React.ReactNode; side?: string; className?: string }) => <div data-testid="sheet-content" data-side={side}>{children}</div>,
  SheetClose: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-close">{children}</div>,
  SheetTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => <div data-testid="sheet-title" className={className}>{children}</div>,
  SheetDescription: ({ children, className }: { children: React.ReactNode; className?: string }) => <div data-testid="sheet-description" className={className}>{children}</div>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href}>{children}</a>,
}));

describe('MobileNav', () => {
  it('renders hamburger trigger on mobile', () => {
    render(<MobileNav />);
    expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
  });

  it('renders nav links in Sheet content', () => {
    render(<MobileNav />);
    expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
    const links = screen.getAllByText('BR Stocks');
    expect(links.length).toBe(2);
  });

  it('renders LanguageToggle', () => {
    render(<MobileNav />);
    const toggles = screen.getAllByText('EN');
    expect(toggles.length).toBe(2);
  });

  it('renders BackLink in Sheet when showBack is true', () => {
    render(<MobileNav showBack />);
    const sheetContent = screen.getByTestId('sheet-content');
    expect(sheetContent.textContent).toContain('← Voltar');
  });

  it('renders desktop nav with links', () => {
    render(<MobileNav />);
    const links = screen.getAllByText('BR Stocks');
    expect(links.length).toBe(2);
  });
});
