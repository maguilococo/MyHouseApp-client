import React from 'react';
import style from './Dashboard.module.css';
import { useSelector} from 'react-redux';

function Dashboard() {
  const { session } = useSelector((store) => store);

  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin'

  return (
    <div className={style.ctn}>
      {isAdmin && (
        <>
          <h3 className={style.title}>Bienvenido a My House-App</h3>
          <p className={style.description}>
            Aquí puede administrar toda la base de datos de la App.
          </p>
        </>
      )}
      {!isAdmin && (
        <>
          <h3 className={style.title}>Bienvenido a tu área personal</h3>
          <p className={style.description}>
            Aquí puedes administrar la configuración de tu cuenta, publicaciones y más.
          </p>
        </>
      )}
    </div>
  );
}

export default React.memo(Dashboard);
