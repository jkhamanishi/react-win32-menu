import { vi } from 'vitest';
import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '../../../test/renderWithProviders';
import { RootMenu } from './RootMenu';


describe('RootMenu', () => {
  it('renders label', () => {
    renderWithProviders(<RootMenu label="Root" />);
    expect(screen.getByText('Root')).toBeInTheDocument();
  });
  
  it('renders icon if provided', () => {
    renderWithProviders(<RootMenu label="Root" icon={<span data-testid="icon">icon</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  
  it('does not render menu when disabled', () => {
    renderWithProviders(
      <RootMenu label="Root" disabled>
        <li>Child</li>
      </RootMenu>
    );
    expect(screen.queryByRole('menu')).toBeNull();
  });
  
  it('renders children in Menu when not disabled', () => {
    renderWithProviders(
      <RootMenu label="Root">
        <li data-testid="child">Child</li>
      </RootMenu>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
  
  it('shows menu when focused and hides when blurred', () => {
    vi.useFakeTimers();
    renderWithProviders(
      <RootMenu label="Root" accessKey="R">
        <li>Child</li>
      </RootMenu>,
      { keepActive: true }
    );
    const menu = screen.getByRole('menu');
    expect(menu).not.toBeVisible();
    act(() => {
      menu.focus();
      vi.advanceTimersToNextFrame();
    });
    expect(document.activeElement).toBe(menu);
    expect(menu).toHaveFocus();
    expect(menu).toBeVisible();
    act(() => {
      menu.blur();
      vi.advanceTimersToNextFrame();
    });
    expect(document.activeElement).not.toBe(menu);
    expect(menu).not.toHaveFocus();
    expect(menu).not.toBeVisible();
    vi.useRealTimers();
  });
  
  it('has role="menuitem"', () => {
    const { getByRole } = renderWithProviders(
      <RootMenu label="Root" />
    );
    expect(getByRole('menuitem')).toBeInTheDocument();
  });
});
