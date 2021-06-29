import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import style from './LandSearchBar.module.css';
import { useHistory } from 'react-router-dom';

function LandSearchbar() {
  const [params, setParams] = useState('');
  
  const history = useHistory();

  function updatePath(params) {
    history.push(`/home?post_name=${params.toString()}`);
  }

  function handleSubmit(e) {
    e.preventDefault()
    updatePath(e.target[0].value);
  }

  return (
    <div className={style.container}>
    <div className={style.ctn}>
      <div className={style.ctn2}>
        <div className={style.title}>
          <h2>Encuentra tu hogar</h2>
        </div>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
            <input type='text' autoComplete="off" value={params} onChange={(e) => setParams(e.target.value)} placeholder='Busca por ubicación o palabra clave' className={style.input} />
            <input type='submit' value='Buscar' className={style.btn1} />
            <Link className={style.link} to='/home'>
              <button type='submit' className={style.btn2}>Explorar</button>
            </Link>
        </form>
      </div>
    </div>
    </div>
  );
}


export default LandSearchbar;
