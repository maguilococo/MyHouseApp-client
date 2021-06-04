import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import logo from '../../images/logoHorizontal-6pt.svg';
import AuthNav from '../Auth0/Auth-nav/Auth-nav';
import style from './NavBar.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { getGoogleUserData, userSession } from '../../Redux/Actions/index';
import { updateExpirationDate } from '../../Services/properties.service'

function NavBar({ userInfo, getGoogleUser, userSession, isMobile }) {
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated && !Object.keys(userInfo).length) {
        if (user.sub.substring(0,6) === 'google'){
          const googleUser = {
            name: user.name,
            email: user.email,
            externalId: user.sub,
            photo: user.picture,
          }
          getGoogleUser(googleUser);
        } else {
          const userId = user.sub.slice(6);
          userSession(userId) 
        }
      }
    updateExpirationDate();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <nav className={style.nav}>
      <NavLink to="/">
        <img className={style.logo} src={logo} alt="logo" />
      </NavLink>
      <div className={style.menu}>
        <div className={style.opt}>
          <NavLink to="/home" className={style.link} activeClassName={style.active}>Inicio</NavLink>
          <NavLink to="/create" className={style.link} activeClassName={style.active}>Publicar</NavLink>
          {isAuthenticated && <NavLink to="/panel/user" className={style.link} activeClassName={style.active}>Mi cuenta</NavLink>}
        </div>
        <div className={style.authNav}>
          <AuthNav />
        </div>
      </div>
      <div className={style.mobileMenu} onClick = {isMobile}>
        <FaBars/>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  userSession: (id) => dispatch(userSession(id)),
  getGoogleUser: (googleUser) => dispatch(getGoogleUserData(googleUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);