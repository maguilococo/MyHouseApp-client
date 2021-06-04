import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouseUser, faCalendarAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FaRegCalendar } from 'react-icons/fa';
import style from './SideMenu.module.css';

function SideMenu({ session }) {
  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';

  const [state, setState] = useState(false);
  const [name, setName] = useState(session.name);

  useEffect(() => {
    setName(session.name)
  }, [session]);
  window.onscroll = () => {
    const scroll = (() => (document.getElementById('navPanel') ? document.getElementById('navPanel').getBoundingClientRect().top : document.getElementById('navPanel')))();
    const scrollWindow = window.scrollY;
    if (scroll < scrollWindow) setState(true);
    else setState(false);
  };
  return (
    <>
      {isAdmin &&
        <div className={`${style.ctn} ${state && style.ctnFixed}`} id="navPanel">
          <label>NAVEGACIÓN</label>
            <div className={style.divTitle}>
              <h2 title='Mi perfil'>
                <NavLink to={`/panel/detail/user/${session.id}`} className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faUserShield} className={style.icon} />
                    {` ${name}`}
                </NavLink>
              </h2>
            </div>
            <div className={style.divTitle}>
              <h3>Gestión de usuarios</h3>
              <p>
                <NavLink to="/panel/admin/users" className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faUser} className={style.icon}/>
                    {' Usuarios'}
                </NavLink>
              </p>
            </div>
            <div className={style.divTitle}>
              <h3>Gestión de publicaciones</h3>
              <p>
                <NavLink to={`/panel/admin/posts`} className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faHouseUser} className={style.icon}/>
                    {' Publicaciones'}
                </NavLink>
              </p>
              <p>
                <NavLink to="/panel/admin/bookings" className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faCalendarAlt} className={style.icon}/>
                    {' Reservas'}
                </NavLink>
              </p>
            </div>
        </div>
        }
        {!isAdmin && (
        <div className={`${style.ctn} ${style.ctnUser} ${state && style.ctnFixed}`} id="navPanel">
          <label>NAVEGACIÓN</label>
            <div className={style.divTitle}>
              <h2 title='Mi perfil'>
                <NavLink to={`/panel/detail/user/${session.id}`} className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faUser} className={style.icon}/>
                    {` ${session.name}`}
                </NavLink>
              </h2>
            </div>
            <div className={style.divTitle}>
              <h3>Publicaciones</h3>
              <p>
                <NavLink to={`/panel/user/${session.id}/posts`} className={style.link} activeClassName={style.active}>
                  <FontAwesomeIcon icon={faHouseUser} className={style.icon}/>
                  {' Mis publicaciones'}
                </NavLink>
              </p>
            </div>
            <div className={style.divTitle}>
              <h3>Reservas</h3>
              <p>
                <NavLink to={`/panel/user/${session.id}/bookings`} className={style.link} activeClassName={style.active}>
                  <FaRegCalendar className={style.icon}/>
                  {' Mis reservas'}
                </NavLink>
              </p>
              <p>
                <NavLink to={`/panel/user/${session.id}/bookingsowner`} className={style.link} activeClassName={style.active}>
                    <FontAwesomeIcon icon={faCalendarAlt} className={style.icon}/>
                    {' Reservas como propietario'}
                </NavLink>
              </p>
            </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(SideMenu);
