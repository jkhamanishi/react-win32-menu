import { render, screen } from '@testing-library/react'

import { MenuItem, MenuItemProps } from './MenuItem';


const defaultProps: MenuItemProps = {
  label: "Test menu item",
}


describe('MenuItem Component Tests', () => {
  
  it('should render without crashing', () => {
    render( <MenuItem {...defaultProps} /> );
    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
  });
  
});
