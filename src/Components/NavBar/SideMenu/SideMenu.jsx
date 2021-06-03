import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {FaTimes} from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { getGoogleUserData, userSession } from '../../../Redux/Actions/index';
import AuthNav from '../../Auth0/Auth-nav/Auth-nav';
import style from './SideMenu.module.css';
const classNames = require("classnames");

function SideMenu({ userInfo, getGoogleUser, userSession, mobile, isMobile }) {
    const { user, isAuthenticated } = useAuth0();
    useEffect(() => {
        if (isAuthenticated && !Object.keys(userInfo).length) {
            if (user.sub.substring(0,6) === 'google'){
            const googleUser = {
                name: user.name,
                email: user.email,
                externalId: user.sub
            }
            getGoogleUser(googleUser);
            } else {
            const userId = user.sub.slice(6);
            userSession(userId) 
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // This component renders the side menu
    return (
        <>
        <aside className={mobile ? classNames(style.container, style.mob) : classNames(style.container, style.nav)}>
            <div className={style.icon} onClick={isMobile}>
                <FaTimes/>
            </div>
            <div className={style.opt}>
                <NavLink to="/create" onClick={isMobile} className={style.link} activeClassName={style.active}>Publicar</NavLink>
                <NavLink to="/home" className={style.link} activeClassName={style.active}>Inicio</NavLink>
                {isAuthenticated && <NavLink to="/panel/user" onClick={isMobile} className={style.link} activeClassName={style.active}>Mi cuenta</NavLink>}
                <span><AuthNav /></span>
            </div>
        </aside>
        </>
    )

}

const mapStateToProps = (state) => ({
    userInfo: state.session,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    userSession: (id) => dispatch(userSession(id)),
    getGoogleUser: (googleUser) => dispatch(getGoogleUserData(googleUser)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);