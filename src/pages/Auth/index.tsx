import { AuthForm } from '@components/UI/AuthForm'
import { Box, styled } from '@mui/material'

const SignContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.blue,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  textAlign: 'center',
}))

const SignIn = () => {
  return (
    <SignContainer>
      <AuthForm />
    </SignContainer>
  )
}

export default SignIn
