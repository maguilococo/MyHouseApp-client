/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from './Signup-button.module.css';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className={style.signup}
      onClick={() => loginWithRedirect({
        screen_hint: 'signup',
      })}
    >
      Registrarse
    </button>
  );
};

export default SignupButton;
