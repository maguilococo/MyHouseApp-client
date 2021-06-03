import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { RiWhatsappFill } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import style from './Share.module.css';

function Share () {

  const location = useLocation().pathname;
  const endPoint = `https://my-house-app.vercel.app${location}`
  return (
    <div className={style.ctn}>
      <input type="checkbox" id='123' className={style.checkbox} />
      <label htmlFor='123' className={style.button} title='Compartir'>
        <FiShare2 />
      </label>
      <div className={style.nav}>
        <a
          href={`https://twitter.com/intent/tweet?text=MiPortalFavorito&url=${endPoint}&via=MyHouseApp&hashtags=#MyHouse-App`}
          target='blank'
          className={style.a}
          title='Twitter' >
            <FaTwitter className={style.logo} />
        </a>
      </div>
      <div className={`${style.nav} ${style.nav2}`}>
        <a
          href={`https://api.whatsapp.com/send?text=${endPoint}`}
          target='blank'
          className={style.a}
          title='Whatsapp'>
            <RiWhatsappFill className={style.logo} />
        </a>
      </div>
      <div className={`${style.nav} ${style.nav3}`}>
        <a
          href={`http://www.facebook.com/sharer.php?u=${endPoint}&t=Encontre esta excelente oferta`}
          target='blank'
          className={style.a}
          title='Facebook'>
            <FaFacebookF className={style.logo}/>
          </a>
        </div>
    </div>
  )
}

export default Share;
