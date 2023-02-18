import {ReactElement} from 'react'
import {
  Box,
  CssBaseline,
  styled
} from '@mui/material'

const Wrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.white
}))

const Layout = ({children}: {children: ReactElement}) => {
  return (
    <Wrapper>
      <CssBaseline/>
      {children}
    </Wrapper>
  )
}

export default Layout
