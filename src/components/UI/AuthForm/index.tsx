import {
  Box, Stack, styled, Typography
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISignInForm } from '@utils/types'
import { useForm } from 'react-hook-form'
import { signInSchema } from '@utils/schemas'
import { Input } from '@ui/Input'
import { showErrorText } from '@utils/utils'
import { useContext, useState } from 'react'
import { AuthContext } from '@components/Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@utils/constants'
import { LoadingButton } from '@mui/lab'
import { useLogin } from '../../../services/auth.service'
import { theme } from '../../../theme'

const SignWrapper = styled(Box)(({ theme }) => ({
  width: '350px',
  backgroundColor: theme.palette.white,
  padding: '20px 30px',
  borderRadius: '6px',
}))

const Title = styled(Typography)(({ theme }) => ({
  padding: '60px 0 30px',
  fontWeight: 'bold',
  color: theme.palette.gray.main,
  borderBottom: `1px solid ${theme.palette.bgr}`,
}))

const  Subtitle = styled(Typography)(({ theme }) => ({
  padding: '30px',
  color: theme.palette.gray.main,
}))

const PrimaryButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  fontSize: '14px',
  padding: '7px 10px',
  textTransform: 'none',
  color: theme.palette.white,
  backgroundColor: theme.palette.blue,

  '&:disabled': {
    color: theme.palette.white,
    opacity: 0.6,
  },

  '&:hover': {
    color: theme.palette.white,
    backgroundColor: theme.palette.blue,
  },


}))

const SecondaryButton = styled(PrimaryButton)(({ theme }) => ({
  backgroundColor: theme.palette.white,
  color: theme.palette.blue,
  padding: '7px 10px',

  '&:hover': {
    backgroundColor: theme.palette.white,
    color: theme.palette.blue,
    borderColor: theme.palette.blue,
  }

}))


export const AuthForm = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const { mutate, error } = useLogin()
  const [loading, setLoading] = useState(false)

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ISignInForm>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema),
  })

  const { username, password } = getValues()

  const submitHandler = (data: ISignInForm) => {
    setLoading(true)
    const { username, password } = data

    mutate(
      { username, password },
      {
        onSuccess: ({ data }) => {
          login({ username: data.username, email: data.email })
          localStorage.setItem('token', data.token)
          setLoading(false)

          navigate(ROUTES.HOME)
        },
        onError: () => {
          reset()
          setLoading(false)
        },
      }
    )
  }

  return (
    <SignWrapper data-testid='auth-form'>
      <Box>
        <Title variant='h4'>Hello System</Title>
        <Subtitle variant='h5'>Log In</Subtitle>
      </Box>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack
          direction='column'
          alignItems='center'
        >
          <Input
            fullWidth
            helperText={showErrorText(errors, 'username', username)}
            autoFocus
            error={!!errors.username && !!username}
            control={control}
            formName='username'
            label='Username'
          />
          <Input
            fullWidth
            helperText={showErrorText(errors, 'password', password)}
            error={!!errors.password && !!password}
            control={control}
            formName='password'
            label='Password'
            isPassword
          />
        </Stack>

        <PrimaryButton
          data-testid='login-button'
          variant='outlined'
          type='submit'
          disabled={!isValid}
          loading={loading}
          loadingPosition='start'
          sx={{ mb: 2 }}
        >
          Log In
        </PrimaryButton>
        <SecondaryButton
          variant='outlined'
          onClick={() => navigate(-1)}
        >
          Cancel
        </SecondaryButton>
      </form>

      {error && (
        <Typography
          variant='h6'
          sx={{ color: theme.palette.red, mt: 2 }}
        >
          {error.message}
        </Typography>
      )}
    </SignWrapper>
  )
}
