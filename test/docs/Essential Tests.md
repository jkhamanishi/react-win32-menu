When building a React component library in TypeScript and testing with **Vitest**, there are several **essential tests** you should include for each component to ensure quality, usability, and reliability. Here's a breakdown of the most common and important types of tests to implement:

---

### ✅ **1. Rendering Test**
Ensure the component renders without crashing.

```ts
it('renders without crashing', () => {
  render(<MyComponent />);
  expect(screen.getByTestId('my-component')).toBeInTheDocument();
});
```

---

### ✅ **2. Props Handling**
Verify that the component accepts and properly applies props (e.g. `className`, `disabled`, `aria-*`, etc.).

```ts
it('applies custom className', () => {
  render(<MyComponent className="custom-class" />);
  expect(screen.getByTestId('my-component')).toHaveClass('custom-class');
});
```

---

### ✅ **3. Event Handling**
Ensure that event handlers (e.g. `onClick`, `onChange`) are called correctly.

```ts
it('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<MyComponent onClick={handleClick} />);
  await userEvent.click(screen.getByTestId('my-component'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

### ✅ **4. Accessibility**
Basic accessibility checks (e.g., correct ARIA attributes, focus behavior).

```ts
it('has correct aria-label', () => {
  render(<MyComponent aria-label="My Label" />);
  expect(screen.getByLabelText('My Label')).toBeInTheDocument();
});
```

You can integrate tools like [`jest-axe`](https://github.com/nickcolley/jest-axe) (also compatible with Vitest) for more in-depth a11y testing.

---

### ✅ **5. Conditional Rendering**
Test dynamic behavior or UI based on props or state.

```ts
it('renders loading state when loading is true', () => {
  render(<MyComponent loading />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

---

### ✅ **6. Snapshot Test (optional but useful)**
Capture a snapshot to track UI regressions.

```ts
import { render } from '@testing-library/react';

it('matches snapshot', () => {
  const { container } = render(<MyComponent />);
  expect(container).toMatchSnapshot();
});
```

---

### ✅ **7. Forwarded Refs (if used)**
Check if refs are forwarded properly (especially for input components or buttons).

```ts
it('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<MyButton ref={ref}>Click</MyButton>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
```

---

### ✅ **8. Typing and Prop Type Checks (via TypeScript)**
These aren't run-time tests, but ensure TypeScript type coverage is enforced by setting `"strict": true` in `tsconfig.json` and using tools like [`tsd`](https://github.com/SamVerschueren/tsd) for testing your TypeScript types (especially for public API exposure in a library).

---

### Optional Enhancements:
- **RTL / LTR layout** tests if supporting internationalization.
- **Theme support** (e.g. light/dark mode).
- **Keyboard navigation** (for accessibility).
- **Controlled vs uncontrolled state behavior** (e.g. for inputs, checkboxes).

---

Would you like a starter template with testing setup for a sample component in your library?