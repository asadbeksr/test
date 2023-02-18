import { Box, styled } from '@mui/material'
import { Menu } from '@components/UI/Sidebar/Menu'
import { Footer } from '@components/UI/Sidebar/Footer'
import { Header } from '@components/UI/Sidebar/Header'

const SSidebar = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.blue,
  padding: 20,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}))

const Sidebar = () => {
  return (
    <SSidebar data-testid='sidebar'>
      <Header />
      <Menu />
      <Footer />
    </SSidebar>
  )
}

export default Sidebar
