import { render, screen } from '@testing-library/react';
import Sidebar from '@ui/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '@components/Contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../theme';

describe('Sidebar', () => {
  test('should not display user card for logged out user', () => {
    const user = {
      user: null,
      login: () => {},
      logout: () => {},
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={user}>
          <ThemeProvider theme={theme}>
            <Sidebar />
          </ThemeProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.queryByTestId('user-card')).toBeNull();
  });

  test('should display user card for logged in user', () => {
    const user = {
      user: {
        email: 'email',
        username: 'username',
      },
      login: () => {},
      logout: () => {},
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={user}>
          <Sidebar />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('username')).toBeInTheDocument();
  });
});
