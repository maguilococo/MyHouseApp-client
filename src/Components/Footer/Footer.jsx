import React from "react";
import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style.main}>
      <div className={style.ctn}>
        <div className={style.title}>
            &copy;{new Date().getFullYear()} MyHouseApp |<a href='/about' className={style.link}>Sobre nosotros</a> | <a className={style.link} href="mailto:myhouseapp.col@gmail.com">Contacto</a>
        </div>
        <div className={style.disclaimer}>
              MyHouseApp es un proyecto realizado para el bootcamp de programación SoyHenry. Toda la información presentada en esta página es ficticia.
        </div>
      </div>
    </div>
  );
}

export default Footer;
