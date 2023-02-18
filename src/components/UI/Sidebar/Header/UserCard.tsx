import { AuthContext } from '@components/Contexts/AuthContext'
import { Typography, styled } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'


const SUserCard = styled(Box)(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${theme.palette.bgr}`,
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0'
}))

const UserIcon = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.white,
  fontSize: '32px',
  fontWeight: 'bold',
  color: theme.palette.blue
}))

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.white
}))

export const UserCard = () => {
  const { user } = useContext(AuthContext)

  return user ? (
    <SUserCard data-testid='user-card'>
      <UserIcon>{user?.username.substring(0, 1)}</UserIcon>
      <UserName variant='h5'>{user?.username}</UserName>
    </SUserCard>
  ) : null
}
