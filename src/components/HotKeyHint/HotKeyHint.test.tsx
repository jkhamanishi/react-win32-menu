import { renderWithProviders } from '../../../test/renderWithProviders';
import { screen } from '@testing-library/react';
import { HotKeyHint } from './HotKeyHint';

describe('HotKeyHint', () => {
  it('renders nothing if hotKeysEnabled is false', () => {
    renderWithProviders(<HotKeyHint hotKey={["ctrl", "s"]} />, { hotKeysEnabled: false });
    expect(screen.queryByText(/Ctrl\+S/i)).toBeNull();
  });

  it('renders nothing if hotKey is not provided', () => {
    renderWithProviders(<HotKeyHint />, { hotKeysEnabled: true });
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it('renders hotKey when enabled', () => {
    renderWithProviders(<HotKeyHint hotKey={["ctrl", "s"]} />, { hotKeysEnabled: true });
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
  });

  it('applies style to span', () => {
    renderWithProviders(<HotKeyHint hotKey={["ctrl", "s"]} />, { hotKeysEnabled: true });
    const span = screen.getByText('Ctrl+S');
    expect(span.tagName.toLowerCase()).toBe('span');
    expect(span).toHaveStyle({ textAlign: 'right' });
  });
});
