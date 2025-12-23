import { renderWithProviders } from '../../../test/renderWithProviders';
import { SubMenu } from './SubMenu';

describe('SubMenu', () => {
  it('renders without crashing', () => {
      const { container } = renderWithProviders(
      <SubMenu label="File">
        <li>Item</li>
      </SubMenu>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
  
  it('has role="menuitem"', () => {
      const { getByRole } = renderWithProviders(
      <SubMenu label="File">
        <li>Item</li>
      </SubMenu>
    );
    expect(getByRole('menuitem')).toBeInTheDocument();
  });
  
  it('renders the label', () => {
      const { getByText } = renderWithProviders(
      <SubMenu label="Edit">
        <li>Item</li>
      </SubMenu>
    );
    expect(getByText('Edit')).toBeInTheDocument();
  });
  
  it('sets aria-disabled when disabled', () => {
      const { getByRole } = renderWithProviders(
      <SubMenu label="Disabled" disabled>
        <li>Item</li>
      </SubMenu>
    );
    expect(getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
  });
  
  it('renders icon if provided', () => {
    const icon = <span data-testid="icon">*</span>;
      const { getByTestId } = renderWithProviders(
      <SubMenu label="WithIcon" icon={icon}>
        <li>Item</li>
      </SubMenu>
    );
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  
  it('does not render submenu when disabled', () => {
      const { queryByRole } = renderWithProviders(
      <SubMenu label="Disabled" disabled>
        <li>Item</li>
      </SubMenu>
    );
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });
});
