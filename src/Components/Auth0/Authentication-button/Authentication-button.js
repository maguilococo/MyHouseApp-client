import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Login-button/Login-button';
import LogoutButton from '../Logout-button/Logout-button';
import SignupButton from '../Signup-button/Signup-button';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  // eslint-disable-next-line react/jsx-filename-extension
  return isAuthenticated ? <LogoutButton /> : (
    <>
      <LoginButton />
      <SignupButton />
    </>
  );
};

export default AuthenticationButton;
