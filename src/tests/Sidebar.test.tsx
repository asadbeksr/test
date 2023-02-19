import { fireEvent, render, screen } from '@testing-library/react';
import MainProvider from '@components/Providers';
import Sidebar from '@ui/Sidebar';
import { menuData } from '@ui/Sidebar/Menu/menuData';

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

  test('render sidebar menu items', () => {
    const { items } = menuData;
  
    const menu = screen.getByTestId('sidebar-menu');
    expect(menu).toBeInTheDocument();
  
    items.forEach((item) => {
      
      if (item.items) {

        const button = screen.getByRole('button', { name: item.label });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        item.items.forEach((dropdownItem) => {
          const dropdownButton = screen.getByRole('link', { name: dropdownItem.label });
          expect(dropdownButton).toBeInTheDocument();
        });

      }
       else {
        const button = screen.getByRole('link', { name: item.label });
        expect(button).toBeInTheDocument();
      }
    });
  });
  

  test('render sidebar footer', () => {
    const logoutButton = screen.getByRole('button', { name: /log (in|out)/i });
    expect(logoutButton).toBeInTheDocument();
  });

  test('render log out if user is logged in otherwise render log in', () => {
    const loginButton = screen.getByRole('button', { name: /log in/i });
    const user = localStorage.getItem('user');
    if (user !== 'null') {
      expect(loginButton).not.toBeInTheDocument();
    } else {
      expect(loginButton).toBeInTheDocument();
    }
  });
});
