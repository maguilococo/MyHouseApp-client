/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from './Login-button.module.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className={style.login}
      onClick={() => loginWithRedirect()}
    >
      Ingresar
    </button>
  );
};

export default LoginButton;
