import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import App from 'src/App';

describe('Navigation', () => {
  test('navigation to homepage', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
      { wrapper: BrowserRouter }
    );

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('navigation to company page', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
      { wrapper: BrowserRouter }
    );

    const aboutLink = screen.getByRole('button', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    expect(screen.getByText('Company')).toBeInTheDocument();

    const companyLink = screen.getByRole('link', { name: /Company/i });
    expect(companyLink).toBeInTheDocument();
    fireEvent.click(companyLink);
    expect(screen.getByText('Company Page')).toBeInTheDocument();
  });

  test('navigation to team page', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
      { wrapper: BrowserRouter }
    );

    const aboutLink = screen.getByRole('button', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    expect(screen.getByText('Team')).toBeInTheDocument();

    const teamLink = screen.getByRole('link', { name: /Team/i });
    expect(teamLink).toBeInTheDocument();
    fireEvent.click(teamLink);
    expect(screen.getByText('Team Page')).toBeInTheDocument();
  });

  test('navigation to bad page', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
