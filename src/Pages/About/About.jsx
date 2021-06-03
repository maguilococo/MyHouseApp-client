import React from 'react';
import style from './About.module.css';

function About() {
  return (
    <div className={style.ctn}>
      <div>
        <h1 className={style.title}>My House-App</h1>
        <h5 className={style.version}>Version 1.0.0</h5>
        <p className={style.description}>
          App developed with React, Redux, Node, Express and Sequelize.
        </p>
      </div>
    </div>
  );
}

export default About;
