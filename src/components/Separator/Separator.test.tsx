import { render } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders without crashing', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });
  
  it('has role="separator"', () => {
    const { getByRole } = render(<Separator />);
    expect(getByRole('separator')).toBeInTheDocument();
  });
});
