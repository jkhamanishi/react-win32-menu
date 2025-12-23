import { ReactElement, RefObject } from 'react';
import { render } from '@testing-library/react';
import { MenuBarContextProvider, MenuBarConfig, defaultConfig } from '../src/contexts/MenuBarContext';


const mockRef = { current: null } as unknown as RefObject<HTMLUListElement>;

export function renderWithProviders(ui: ReactElement, customConfig?: Partial<MenuBarConfig>) {
  const mergedConfig = { ...defaultConfig, ...customConfig };
  return render(
    <MenuBarContextProvider config={mergedConfig} containerRef={mockRef}>
      {ui}
    </MenuBarContextProvider>
  );
}

export { useMenuBarContext } from '../src/contexts/MenuBarContext';
export { useAccessKeysContext } from '../src/contexts/AccessKeysContext';
