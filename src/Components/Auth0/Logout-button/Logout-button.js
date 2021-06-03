/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from './Logout-button.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className={style.logout}
      onClick={() => logout({
        returnTo: window.location.origin,
      })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
