import { render, screen } from '@testing-library/react'
import Sidebar from '@ui/Sidebar'
import { ThemeProvider } from '@mui/material'
import { AuthContext } from '@components/Contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import {theme} from '.././theme'

describe('User', () => {
  it('not logged in user', () => {
    const user = {
      user: null,
      login: () => null,
      logout: () => null,
    }

    render(
      <BrowserRouter>
        <AuthContext.Provider value={user}>
        <ThemeProvider theme={theme}>
          <Sidebar />
        </ThemeProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    )

    expect(screen.queryByTestId('user-card')).not.toBeInTheDocument()
  })

  it('render user card', () => {
    const user = {
      user: {
        email: 'email',
        username: 'username',
      },
      login: () => null,
      logout: () => null,
    }

    render(
      <BrowserRouter>
        <AuthContext.Provider value={user}>
          <Sidebar />
        </AuthContext.Provider>
      </BrowserRouter>
    )

    expect(screen.getByText('username')).toBeInTheDocument()
  })
})
