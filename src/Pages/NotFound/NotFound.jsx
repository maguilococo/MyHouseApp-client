import React from 'react';
import style from './NotFound.module.css';
import { Link } from 'react-router-dom';
import img from '../../images/casarota2.jpg'


function NotFound() {
  return (
    <div className={style.ctn}>
        <div>
        <h2 className={style.title}>En este momento no hay publicaciones que coincidan con tu búsqueda</h2>
        </div>
          <img className={style.img} src={img} />
        <div>
        <div>
        <h2 className={style.title}>Prueba borrando algún filtro</h2>
        </div>
        </div>
    </div>
  );
}

export default NotFound;
