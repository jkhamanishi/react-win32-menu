Here's how you can **mock a React Context** in a Vitest test instead of using the real provider. This is useful when:

* You want to isolate the component from context logic.
* You want to simulate specific values or behaviors easily.

---

## ✅ Example: Mocking a Context in a Test

Let’s assume we’re testing the same `ThemeButton` component:

```tsx
// src/components/ThemeButton.tsx
import { useTheme } from '../context/ThemeContext';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
};
```

### 🔧 Mocking the Context

```tsx
// src/components/ThemeButton.mocked.test.tsx
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as ThemeContext from '../context/ThemeContext'; // <- import the whole module
import { ThemeButton } from './ThemeButton';

describe('ThemeButton (mocked)', () => {
  it('uses mocked context values', () => {
    const toggleMock = vi.fn();
    
    // Mock useTheme hook
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: toggleMock,
    });
    
    render(<ThemeButton />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Current theme: dark');
    
    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalled();
  });
});
```
