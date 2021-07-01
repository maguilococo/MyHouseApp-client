import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonOptions from '../ButtonOptions/ButtonOptions';
import style from './TablePage.module.css';

export default function TableRow({
  column1, displayLink, link, column2, column3,
  path, id, buttonPath, deleteAction, userId
}) {
  return (
      <tr>
        <td>{column1}</td>
        {displayLink
          ? (
            <td>
              <NavLink to={`/panel/detail/${path}/${link}`} className={style.link}>
                {column2}
              </NavLink>
            </td>
          )
          : (
            <td>
              { column2 }
            </td>
          )}
        <td >{column3}</td>
        <td>
          <ButtonOptions
            userId={userId}
            deleteAction={deleteAction}
            buttonPath={buttonPath}
            id={id}
          />
        </td>
      </tr>
  );
}
