import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from 'src/App'

describe('Navigation', () => {
  test('navigation to homepage', () => {
    render(<App />, { wrapper: BrowserRouter })

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  })

  test('navigation to company page', () => {
    render(<App />, { wrapper: BrowserRouter })

    const aboutLink = screen.getByRole('button', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    expect(screen.getByText('Company')).toBeInTheDocument();

    const companyLink = screen.getByRole('link', { name: 'Company' });
    expect(companyLink).toBeInTheDocument();
    fireEvent.click(companyLink);
    expect(screen.getByText('Company Page')).toBeInTheDocument();
  })

  test('navigation to team page', () => {
    render(<App />, { wrapper: BrowserRouter })

    const aboutLink = screen.getByRole('button', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    expect(screen.getByText('Team')).toBeInTheDocument();

    const teamLink = screen.getByRole('link', { name: 'Team' });
    expect(teamLink).toBeInTheDocument();
    fireEvent.click(teamLink);
    expect(screen.getByText('Team Page')).toBeInTheDocument();
  })

  test('navigation to bad page', () => {
    const badRoute = '/some/bad/route'

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  })
})
