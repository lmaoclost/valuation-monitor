import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

describe('UI Components', () => {
  describe('Button', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should handle click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should support disabled state', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should render and be interactive', () => {
      const { container } = render(<Button>Interactive</Button>);
      const button = container.querySelector('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Interactive');
    });

    it('should support asChild prop to render as alternate element', () => {
      const { container } = render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('Link Button');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Input', () => {
    it('should render input element', () => {
      render(<Input placeholder="Enter text" />);

      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('should handle text input', async () => {
      const user = userEvent.setup();

      render(<Input placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;

      await user.type(input, 'Hello World');
      expect(input.value).toBe('Hello World');
    });

    it('should support different input types', () => {
      const { rerender } = render(<Input type="text" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      rerender(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('should handle change events', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('should be clearable', async () => {
      const user = userEvent.setup();

      render(<Input defaultValue="initial" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('initial');

      await user.clear(input);
      expect(input.value).toBe('');
    });
  });

  describe('Checkbox', () => {
    it('should render checkbox', () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle checked state', async () => {
      const user = userEvent.setup();

      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should support default checked', () => {
      render(<Checkbox defaultChecked />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should support disabled state', () => {
      render(<Checkbox disabled />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should work with label', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Checkbox id="terms" />
          <label htmlFor="terms">Accept terms</label>
        </div>
      );

      const label = screen.getByText('Accept terms');
      const checkbox = screen.getByRole('checkbox');

      await user.click(label);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Table Components', () => {
    it('should render TableFooter', () => {
      const { container } = render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const footer = container.querySelector('[data-slot="table-footer"]');
      expect(footer).toBeInTheDocument();
    });

    it('should render TableCaption', () => {
      render(
        <Table>
          <TableCaption>This is a table caption</TableCaption>
        </Table>
      );

      expect(screen.getByText('This is a table caption')).toBeInTheDocument();
    });

    it('should render complete table with footer and caption', () => {
      const { container } = render(
        <Table>
          <TableCaption>Table Caption</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const caption = screen.getByText('Table Caption');
      const footer = container.querySelector('[data-slot="table-footer"]');
      const header = container.querySelector('[data-slot="table-header"]');

      expect(caption).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(header).toBeInTheDocument();
    });
  });
});
