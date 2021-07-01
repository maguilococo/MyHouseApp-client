import React from 'react';
import TableRows from './TableRow';
import style from './TablePage.module.css';

function TablePage({
  userId,
  deleteAction,
  tableName,
  columns,
  data,
  buttonPath,
  path,
}) {

  return (
    <div className={style.ctn}>
      <h3 className={style.title}>{tableName}</h3>
      <table className={style.ctnList}>
        <thead>
          <tr>
            {columns && (columns.map((col, index) => (
              <td key={index}>{col}</td>
            )))}
            <td key={columns?.length+1}></td>
          </tr>
        </thead>
        <tbody>
          {data?.map((e) => (
            <TableRows
              userId={userId}
              deleteAction={deleteAction}
              column1={e.column1}
              displayLink={e.displayLink}
              link={e.link}
              column2={e.column2}
              column3={e.column3}
              id={e.id}
              buttonPath={buttonPath}
              path={path}
            />
          ))}
          {data.length < 1 &&
            <tr><td>No tienes nada agregado en {tableName} aún</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(TablePage);
