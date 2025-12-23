import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders children', () => {
    renderWithProviders(
      <Menu show={true}>
        <li data-testid="child">Child</li>
      </Menu>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  
  it('sets role to menu and tabIndex to -1', () => {
    renderWithProviders(
      <Menu show={true}>
        <li>Item</li>
      </Menu>
    );
    const menu = screen.getByRole('menu');
    expect(menu).toHaveAttribute('tabIndex', '-1');
  });
  
  it('applies opacity 1 and pointerEvents auto when show is true', () => {
    renderWithProviders(
      <Menu show={true}>
        <li>Item</li>
      </Menu>
    );
    const menu = screen.getByRole('menu');
    expect(menu).toHaveStyle({ opacity: '1', pointerEvents: 'auto' });
  });
  
  it('applies opacity 0 and pointerEvents none when show is false', () => {
    renderWithProviders(
      <Menu show={false}>
        <li>Item</li>
      </Menu>
    );
    const menu = screen.getByRole('menu');
    expect(menu).toHaveStyle({ opacity: '0', pointerEvents: 'none' });
  });
  
  it('positions submenu with top and left when subMenu is true', () => {
    renderWithProviders(
      <Menu show={true} subMenu={true}>
        <li>Item</li>
      </Menu>
    );
    const menu = screen.getByRole('menu');
    expect(menu.style.top).toBe('0px');
    expect(menu.style.left).toContain('calc(100%');
  });
  
  it('does not set top/left when subMenu is false', () => {
    renderWithProviders(
      <Menu show={true} subMenu={false}>
        <li>Item</li>
      </Menu>
    );
    const menu = screen.getByRole('menu');
    expect(menu.style.top).toBe('');
    expect(menu.style.left).toBe('');
  });
  
  it('has role="menu"', () => {
    renderWithProviders(
      <Menu show={true}><li>Item</li></Menu>
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
