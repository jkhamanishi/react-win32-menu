import { describe, it, expect, vi } from 'vitest';
import { screen, act } from '@testing-library/react';
import { useRef, RefObject } from 'react';

import { renderWithProviders, useAccessKeysContext, useMenuBarContext } from './renderWithProviders';
import useAccessKey from '../src/hooks/useAccessKey';


function ContextTestComponent() {
  const { active, activate, deactivate } = useAccessKeysContext();
  const { activate: activateMenuBar, deactivate: deactivateMenuBar } = useMenuBarContext();
  return (
    <div>
      <span data-testid="active">{active ? 'active' : 'inactive'}</span>
      <button data-testid="activate" onClick={activate}>Activate</button>
      <button data-testid="deactivate" onClick={deactivate}>Deactivate</button>
      <button data-testid="activate-menubar" onClick={activateMenuBar}>Activate Menubar</button>
      <button data-testid="deactivate-menubar" onClick={deactivateMenuBar}>Deactivate Menubar</button>
    </div>
  );
}

function AccessKeyTest({fn: onSelect}: {fn: () => void}) {
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  useAccessKey(ref, 'A', onSelect);
  const { activate } = useAccessKeysContext();
  return (
    <ul>
      <li ref={ref}>Item 1</li>
      <li tabIndex={-1}>Item 2</li>
      <button data-testid="activate" onClick={activate}>Activate</button>
    </ul>
  );
}

function RootMenuAccessKeyTest({fn: onSelect}: {fn: () => void}) {
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  useAccessKey(ref, 'A', onSelect);
  const { activate } = useAccessKeysContext();
  return (
    <ul role="menubar">
      <li ref={ref} role="menuitem">Root Item</li>
      <li tabIndex={-1} role="menuitem">Other Item</li>
      <button data-testid="activate" onClick={activate}>Activate</button>
    </ul>
  );
}


describe('AccessKeysContext', () => {
  it('should default to inactive', () => {
    renderWithProviders(<ContextTestComponent />);
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
  
  it('should activate and deactivate', () => {
    renderWithProviders(<ContextTestComponent />);
    act(() => {
      screen.getByTestId('activate').click();
    });
    expect(screen.getByTestId('active').textContent).toBe('active');
    act(() => {
      screen.getByTestId('deactivate').click();
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
  
  it('toggles active state with Alt key', () => {
    renderWithProviders(<ContextTestComponent />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Alt' }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Alt' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('active');
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Alt' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
  
  it('deactivates with Escape key', () => {
    renderWithProviders(<ContextTestComponent />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Alt' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('active');
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
  
  it('does not activate if hotKeysEnabled is false', () => {
    renderWithProviders(<ContextTestComponent />, { hotKeysEnabled: false });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Alt' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
  
  it('deactivates when menubar.active becomes false', () => {
    renderWithProviders(<ContextTestComponent />);
    act(() => {
      screen.getByTestId('activate-menubar').click();
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Alt' }));
    });
    expect(screen.getByTestId('active').textContent).toBe('active');
    act(() => {
      screen.getByTestId('deactivate-menubar').click();
    });
    expect(screen.getByTestId('active').textContent).toBe('inactive');
  });
});

describe('useAccessKey', () => {
  it('does not call onSelect if menu is not active', () => {
    const onSelect = vi.fn();
    renderWithProviders(<AccessKeyTest fn={onSelect} />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    });
    expect(onSelect).not.toHaveBeenCalled();
  });
  
  it('calls onSelect when access key is pressed and menu is active', () => {
    const onSelect = vi.fn();
    renderWithProviders(<AccessKeyTest fn={onSelect} />);
    act(() => {
      screen.getByTestId('activate').click();
    });
    act(() => {
      screen.getByText('Item 2').focus();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    });
    expect(onSelect).toHaveBeenCalled();
  });
  
  it('calls onSelect in root menu when nothing is focused', () => {
    const onSelect = vi.fn();
    renderWithProviders(<RootMenuAccessKeyTest fn={onSelect} />);
    act(() => {
      screen.getByTestId('activate').click();
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    });
    expect(onSelect).toHaveBeenCalled();
  });
  
  it('does not call onSelect in root menu when another element is focused', () => {
    const onSelect = vi.fn();
    renderWithProviders(<RootMenuAccessKeyTest fn={onSelect} />);
    act(() => {
      screen.getByTestId('activate').click();
    });
    act(() => {
      screen.getByText('Other Item').focus();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
    });
    expect(onSelect).not.toHaveBeenCalled();
  });
});
