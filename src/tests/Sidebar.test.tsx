import { render, screen } from '@testing-library/react'
import MainProvider from '@components/Providers'
import Sidebar from '@ui/Sidebar'

describe('Sidebar component', () => {
  beforeEach(() => {
    render(
      <MainProvider>
        <Sidebar />
      </MainProvider>
    )
  })

  test('renders sidebar component', () => {
    const sidebar = screen.queryByTestId('sidebar')
    expect(sidebar).toBeInTheDocument()
  })

  test('render sidebar header', () => {
    const header = screen.getByRole('heading', { name: 'Hello System' })
    expect(header).toBeInTheDocument()
  })
})
