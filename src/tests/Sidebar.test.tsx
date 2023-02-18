import { render, screen } from '@testing-library/react';
import MainProvider from '@components/Providers';
import Sidebar from '@ui/Sidebar';

describe('Sidebar component', () => {
  beforeEach(() => {
    render(
      <MainProvider>
        <Sidebar />
      </MainProvider>
    );
  });

  test('renders sidebar component', () => {
    const sidebar = screen.queryByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  test('render sidebar header', () => {
    const header = screen.getByRole('heading', { name: 'Hello System' });
    expect(header).toBeInTheDocument();
  });

  test('render sidebar menu', () => {
    const menu = screen.getByTestId('sidebar-menu');
    expect(menu).toBeInTheDocument();
  });

  test('render sidebar footer', () => {
    const logoutButton = screen.getByTestId('login-button-sidebar');
    expect(logoutButton).toBeInTheDocument();
  });

  test('render log out if user is logged in otherwise render log in', () => {
    const loginButton = screen.getByTestId('login-button-sidebar');
    const user = localStorage.getItem('user');
    if (user !== 'null') {
      expect(loginButton).not.toBeInTheDocument();
    } else {
      expect(loginButton).toBeInTheDocument();
    }
  });
});
