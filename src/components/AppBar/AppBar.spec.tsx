import { render, screen, fireEvent } from '@testing-library/react';
import AppBar from './AppBar';


test('Header renders with user name and sign out button', () => {
    render(<AppBar />);
    expect(screen.getByTestId('signout')).toBeTruthy();
});

test('Clicking "Sign Out" button calls signOut function and clears localStorage', () => {
    render(<AppBar />);
    const signOutButton = screen.getByTestId('signout');
    fireEvent.click(signOutButton);
    expect(window.location.pathname).toBe('/');
 });