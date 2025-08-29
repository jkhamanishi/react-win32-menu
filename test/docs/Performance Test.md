## Example Performance Test
```ts
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('fully renders within 2 seconds', async () => {
    const start = performance.now();
    
    render(<MyComponent />);
    
    // Replace this with the condition that defines "fully rendered"
    await waitFor(() => {
      expect(screen.getByText('Finished loading')).toBeInTheDocument();
    }, { timeout: 2000 }); // This will fail if it takes longer than 2s
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThanOrEqual(2000);
  });
});
```
