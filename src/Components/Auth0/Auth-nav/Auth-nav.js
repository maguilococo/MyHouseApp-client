/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import AuthenticationButton from '../Authentication-button/Authentication-button';
import style from './Auth-nav.module.css';

const AuthNav = () => (
  <div className={style.menu}>
    <AuthenticationButton />
  </div>
);

export default AuthNav;
