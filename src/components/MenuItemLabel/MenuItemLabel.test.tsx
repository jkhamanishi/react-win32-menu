import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { MenuItemLabel } from './MenuItemLabel';
import { defaultConfig } from '../../contexts/ConfigContext';


describe('MenuItemLabel', () => {
  it('renders label text', () => {
    renderWithProviders(<MenuItemLabel label="Test" focused={false} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('renders icon if provided', () => {
    renderWithProviders(<MenuItemLabel label="Test" focused={false} icon={<span data-testid="icon">icon</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  
  it('renders checked icon if checked', () => {
    renderWithProviders(<MenuItemLabel label="Test" focused={false} checked />);
    expect(screen.getByText(defaultConfig.checkedIcon as string)).toBeInTheDocument();
  });
  
  it('calls onClick handler', () => {
    const onClick = vi.fn();
    renderWithProviders(<MenuItemLabel label="Test" focused={false} onClick={onClick} />);
    screen.getByText('Test').click();
    expect(onClick).toHaveBeenCalled();
  });
});
