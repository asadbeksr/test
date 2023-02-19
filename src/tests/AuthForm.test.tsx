import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthForm } from '@components/UI/AuthForm';
import MainProvider from '@components/Providers';

describe('AuthForm', () => {
  beforeEach(() => {
    render(
      <MainProvider>
        <AuthForm />
      </MainProvider>
    );
  });

  test('renders auth form', () => {
    const authForm = screen.getByTestId('auth-form');
    expect(authForm).toBeInTheDocument();
  });

  test('fills in the username input', async () => {
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toHaveValue('');

    fireEvent.change(usernameInput, { target: { value: 'username' } });

    expect(usernameInput).toHaveValue('username');
  });

  test('fills in the password input', async () => {
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveValue('');

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(passwordInput).toHaveValue('password');
  });

  test('enables login button when both username and password are filled in', async () => {
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await waitFor(() => expect(loginButton).toBeEnabled());
  });

  test('renders a login button', () => {
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    expect(loginButton).toBeInTheDocument();
  });

  test('display error when login fails', async () => {
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'kminchelle' } });
    fireEvent.change(passwordInput, { target: { value: '0lelplR' } });

    fireEvent.click(loginButton);

    expect(localStorage.getItem('user')).toBe('null');
  });

  test('successfully logs in', async () => {
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'kminchelle' } });
    fireEvent.change(passwordInput, { target: { value: '0lelplR' } });

    fireEvent.click(loginButton);

    expect(localStorage.getItem('user')).toBeTruthy();
  });

  test('cancel button redirects to home page', async () => {
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(window.location.pathname).toBe('/');
  });
});
