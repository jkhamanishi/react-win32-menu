import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../../test/renderWithProviders';

import { AccessKeyHint } from './AccessKeyHint';


describe('AccessKeyHint', () => {
  it('renders label without underline if inactive', () => {
    renderWithProviders(<AccessKeyHint label="Test" accessKey="T" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(document.querySelector('u')).toBeNull();
  });
  
  it('renders label without underline if accessKey not in label', () => {
    renderWithProviders(<AccessKeyHint label="Test" accessKey="X" />);
    fireEvent.keyDown(window, { key: 'Alt' });
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(document.querySelector('u')).toBeNull();
    fireEvent.keyUp(window, { key: 'Alt' });
  });
  
  it('renders label with underline when active and accessKey in label', () => {
    renderWithProviders(<AccessKeyHint label="Test" accessKey="T" />);
    fireEvent.keyDown(window, { key: 'Alt' });
    const uElem = document.querySelector('u');
    expect(uElem).not.toBeNull();
    expect(uElem?.textContent).toBe('T');
    fireEvent.keyUp(window, { key: 'Alt' });
  });
  
  it('applies style to span', () => {
    renderWithProviders(<AccessKeyHint label="Test" accessKey="T" />);
    fireEvent.keyDown(window, { key: 'Alt' });
    const span = document.querySelector('span');
    expect(span).toHaveStyle({ width: 'max-content' });
    fireEvent.keyUp(window, { key: 'Alt' });
  });
});
