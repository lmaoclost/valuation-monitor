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

vi.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: ({ children, 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu" {...props}>{children}</div>,
  Portal: ({ children, 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu-portal" {...props}>{children}</div>,
  Trigger: ({ children, 'data-slot': slot, ...props }: any) => <button data-slot="dropdown-menu-trigger" {...props}>{children}</button>,
  Content: ({ children, 'data-slot': slot, sideOffset, ...props }: any) => <div data-slot="dropdown-menu-content" {...props}>{children}</div>,
  Group: ({ children, 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu-group" {...props}>{children}</div>,
  Label: ({ children, 'data-slot': slot, 'data-inset': inset, ...props }: any) => <div data-slot="dropdown-menu-label" data-inset={inset} {...props}>{children}</div>,
  Item: ({ children, 'data-slot': slot, className, 'data-variant': variant, 'data-inset': inset, ...props }: any) => <div data-slot="dropdown-menu-item" className={className} data-variant={variant} data-inset={inset} {...props}>{children}</div>,
  CheckboxItem: ({ children, 'data-slot': slot, checked, ...props }: any) => <div data-slot="dropdown-menu-checkbox-item" data-checked={checked} {...props}>{children}</div>,
  RadioGroup: ({ children, 'data-slot': slot, value, ...props }: any) => <div data-slot="dropdown-menu-radio-group" data-value={value} {...props}>{children}</div>,
  RadioItem: ({ children, 'data-slot': slot, value, ...props }: any) => <div data-value={value} {...props}>{children}</div>,
  Separator: ({ 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu-separator" {...props} />,
  Sub: ({ children, 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu-sub" {...props}>{children}</div>,
  SubTrigger: ({ children, 'data-slot': slot, 'data-inset': inset, ...props }: any) => <div data-slot="dropdown-menu-sub-trigger" data-inset={inset} {...props}>{children}</div>,
  SubContent: ({ children, 'data-slot': slot, ...props }: any) => <div data-slot="dropdown-menu-sub-content" {...props}>{children}</div>,
  ItemIndicator: ({ children }) => <>{children}</>,
}));

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

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

  describe('DropdownMenu', () => {
    it('should render DropdownMenu', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]');
      expect(trigger).toBeInTheDocument();
    });

    it('should render DropdownMenuTrigger', () => {
      const { container } = render(<DropdownMenuTrigger>Open</DropdownMenuTrigger>);
      const trigger = container.querySelector('[data-slot="dropdown-menu-trigger"]');
      expect(trigger).toBeInTheDocument();
    });

    it('should render DropdownMenuContent', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Test</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const content = container.querySelector('[data-slot="dropdown-menu-content"]');
      expect(content).toBeInTheDocument();
    });

    it('should render DropdownMenuItem', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Test Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('should render DropdownMenuLabel', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel>Label Text</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Label Text')).toBeInTheDocument();
    });

    it('should render DropdownMenuSeparator', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const separator = container.querySelector('[data-slot="dropdown-menu-separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('should render DropdownMenuCheckboxItem', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={false}>
              Checkbox Item
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Checkbox Item')).toBeInTheDocument();
    });

    it('should render DropdownMenuRadioGroup', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value="one">
              <DropdownMenuRadioItem value="one">
                Option One
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="two">
                Option Two
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Option One')).toBeInTheDocument();
      expect(screen.getByText('Option Two')).toBeInTheDocument();
    });

    it('should render DropdownMenuGroup', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Grouped Item</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const group = container.querySelector('[data-slot="dropdown-menu-group"]');
      expect(group).toBeInTheDocument();
    });

    it('should render DropdownMenuPortal', () => {
      const { container } = render(
        <DropdownMenuPortal>
          <div>Portal Content</div>
        </DropdownMenuPortal>
      );

      const portal = container.querySelector('[data-slot="dropdown-menu-portal"]');
      expect(portal).toBeInTheDocument();
    });

    it('should render DropdownMenuSub', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sub Trigger</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const sub = container.querySelector('[data-slot="dropdown-menu-sub"]');
      expect(sub).toBeInTheDocument();
    });

    it('should render DropdownMenuSubTrigger', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      expect(screen.getByText('Sub Menu')).toBeInTheDocument();
    });

    it('should render DropdownMenuSubContent', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubContent>Sub Content</DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const subContent = container.querySelector('[data-slot="dropdown-menu-sub-content"]');
      expect(subContent).toBeInTheDocument();
    });

    it('should render DropdownMenuShortcut', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Item
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const shortcut = screen.getByText('⌘K');
      expect(shortcut).toBeInTheDocument();
    });

    it('should support className on DropdownMenuItem', () => {
      render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem className="custom-class">
              Styled Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = screen.getByText('Styled Item');
      expect(item).toHaveClass('custom-class');
    });

    it('should support variant prop on DropdownMenuItem', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem variant="destructive">
              Destructive Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = container.querySelector('[data-variant="destructive"]');
      expect(item).toBeInTheDocument();
    });

    it('should support inset on DropdownMenuLabel', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const label = container.querySelector('[data-inset="true"]');
      expect(label).toBeInTheDocument();
    });

    it('should support inset on DropdownMenuItem', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const item = container.querySelector('[data-inset="true"]');
      expect(item).toBeInTheDocument();
    });

    it('should support sideOffset on DropdownMenuContent', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

      const content = container.querySelector('[data-slot="dropdown-menu-content"]');
      expect(content).toBeInTheDocument();
    });
  });
});
