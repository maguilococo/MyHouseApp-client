import { Button } from 'antd'
import React from 'react'
import style from './About.module.css';
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import renny from './images/renny.jpg';
import pablo from './images/pablo.jpg';
import magui from './images/magui.jpg';
import seba from './images/seba.jpg';
import marcos from './images/marcos.jpg';

const About = () => {

    const profiles = [
        {
            name: "Renny Galíndez",
            linkedIn: "https://www.linkedin.com/in/rennygalindez/",
            github: "https://github.com/rennygalindez",
            image: renny,
        },
        {
            name: "Pablo Chaves",
            linkedIn: "https://www.linkedin.com/in/pablo-chaves-/",
            github: "https://github.com/pablo-chaves",
            image: pablo,
        },
        {
            name: "Magdalena Lococo",
            linkedIn: "https://www.linkedin.com/in/magdalenalococo/",
            github: "https://github.com/maguilococo/",
            image: magui,
        },
        {
            name: "Sebastián Ávila",
            linkedIn: "https://www.linkedin.com/in/sebastian-mariano-avila-js/",
            github: "https://github.com/sebastianomsk",
            image: seba,
        },
        {
            name: "Marcos Gimbatti",
            linkedIn: "https://www.linkedin.com/in/marcosgimbatti/",
            github: "https://github.com/mgimbatti",
            image: marcos,
        },
    ]

    let team = profiles.sort(function () { return Math.random() - 0.5 })

    return (
        <div className={style.aboutUsContainer}>
            <div className={style.titleAboutUs}>Sobre nosotros</div>
            <div className={style.descriptionAboutUs}>Esta aplicación fue desarrollada por un grupo de estudiantes de Henry, utilizando las siguientes tecnologías: React, Redux, HTML, CSS, NodeJS, Express, Sequelize, Postgres.
            </div>
            <div className={style.cardscontainer}>
            {
                team.map((e, i) =>
                    <div className={style.flipcard} key={i}>
                        <div className={style.flipcardinner}>

                            <div className={style.flipcardfront}>
                                <img className={style.imageProfileAboutUs} src={e.image} alt="profilepic" />
                                <div className={style.aboutUsName}>{e.name}</div>
                            </div>

                            <div className={style.flipcardback}>
                                <div className={style.aboutUsIcons}>
                                    <Button type="text" href={e.linkedIn} target="_blank"><AiFillLinkedin style={{ color: "white", fontSize: "35px" }} /></Button>
                                    <Button type="text" href={e.github} target="_blank"><AiFillGithub style={{ color: "white", fontSize: "35px" }} /></Button>
                                </div>
                                <div className={style.aboutUsName1}>{e.name}</div>
                            </div>
                        </div>
                    </div>
                )
            }
          </div>
        </div>
    )
}

export default About;

