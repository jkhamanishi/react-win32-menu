import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test/renderWithProviders';

import { MenuItem, MenuItemProps } from './MenuItem';
import { defaultConfig } from '../../contexts/ConfigContext';


describe('MenuItem', () => {
  const baseProps: MenuItemProps = {
    label: 'Test Item',
    menuId: 'test-item',
  };
  
  it('renders with label', () => {
    renderWithProviders(<MenuItem {...baseProps} />);
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-label', 'Test Item');
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
  
  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    renderWithProviders(<MenuItem {...baseProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Test Item'));
    expect(onSelect).toHaveBeenCalled();
  });
  
  it('does not call onSelect when disabled', () => {
    const onSelect = vi.fn();
    renderWithProviders(<MenuItem {...baseProps} onSelect={onSelect} disabled />);
    fireEvent.click(screen.getByRole('menuitem'));
    expect(onSelect).not.toHaveBeenCalled();
  });
  
  it('does not render when show is false', () => {
    renderWithProviders(<MenuItem {...baseProps} show={false} />);
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });
  
  it('renders icon if provided', () => {
    renderWithProviders(<MenuItem {...baseProps} icon={<span data-testid="icon">icon</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  
  it('renders checked state', () => {
    renderWithProviders(<MenuItem {...baseProps} checked />);
    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toBeInTheDocument();
    const checkMark = screen.getByText(defaultConfig.checkedIcon as string);
    expect(checkMark).toBeInTheDocument();
  });
  
  it('handles Enter key press', () => {
    const onSelect = vi.fn();
    renderWithProviders(<MenuItem {...baseProps} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalled();
  });
  
  it('sets aria-disabled when disabled', () => {
    renderWithProviders(<MenuItem {...baseProps} disabled />);
    expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
  });
  
  it('underlines accessKey when Alt is pressed', () => {
    renderWithProviders(<MenuItem label="Test" menuId="test-item" accessKey="T" />);
    fireEvent.keyDown(window, { key: 'Alt' });
    const underlined = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'u' && content === 'T';
    });
    expect(underlined).toBeInTheDocument();
    fireEvent.keyUp(window, { key: 'Alt' });
  });
  
  it('has role="menuitem"', () => {
    const { getByRole } = renderWithProviders(
      <MenuItem label="Test" />
    );
    expect(getByRole('menuitem')).toBeInTheDocument();
  });
});
