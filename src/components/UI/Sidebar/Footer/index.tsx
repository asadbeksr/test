import { Box, Button, styled } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '@components/Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

const PrimaryButton = styled(Button)(({ theme }) => ({
  width: '100%',
  fontSize: 14,
  padding: '7px 10px',
  textTransform: 'none',
  color: theme.palette.blue,
  backgroundColor: theme.palette.white,
  '&:hover': {
    backgroundColor: theme.palette.bgr,
  },
}));

export const Footer = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Box sx={{ marginTop: 'auto', width: '100%' }}>
      {user ? (
        <PrimaryButton onClick={logout} variant='contained' data-testid='logout-button-sidebar'>
          Log Out
        </PrimaryButton>
      ) : (
        <Link to={ROUTES.SIGN_IN}>
          <PrimaryButton variant='contained'  data-testid='login-button-sidebar'>Log In</PrimaryButton>
        </Link>
      )}
    </Box>
  );
};
