/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { getUserDataService, editUserService, addUserService } from '../../../../Services/user.service';
import Loading from '../../../Auth0/Loading/loading';
import EditButtonBar from '../../ButtonsBar/EditButtonBar/EditButtonBar';
import style from './EditUser.module.css';
import Swal from 'sweetalert2';

function EditUser({ session, id, action }) {
  const [input, setInput] = useState({})
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  // let history = useHistory();
  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';

  useEffect(() => {
    async function fetchUser(id) {
      const userInfo = await getUserDataService(id);
      setUserDetail(userInfo.data.user);
      setLoading(false);
    }
    fetchUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);

  useEffect(() => {
    setInput({
      name: action === 'edit' ? userDetail.name : '',
      email: action === 'edit' ? userDetail.email : '',
      phone: action === 'edit' ? userDetail.phone : '',
      city: action === 'edit' ? userDetail.city : '',
      street_number: action === 'edit' ? userDetail.street_number : '',
      zip_code: action === 'edit' ? userDetail.zip_code : '',
      status: action === 'edit' ? userDetail.status : '',
      type: action === 'edit' ? userDetail.type : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action === 'edit' && userDetail.status]);


  function validate(input) {
    // const regEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
    const errors = {};
    if (!input.name) {
      errors.name = 'El nombre es requerido';
    } else if (!input.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (input.type !== 'User' && input.type !== 'Admin' && input.type !== 'SuperAdmin') {
      errors.type = 'El rol es requerido';
    }
    return errors;
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setErrors(validate({
      ...input,
      [name]: value,
    }));
    setInput({
      ...input,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.entries(errors).length > 0) {
      return Swal.fire({
        icon: 'warning',
        title: 'Revisar campos requeridos',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      if (action === 'edit') {
       /*  if (errors === '') {
          <Link to="/panel" />
          return Swal.fire({
            icon: 'info',
            title: `No se han realizado modificaciones`,
            showConfirmButton: false,
            timer: 1500
          })
        } else { */
          return editUserService(id, input).then(  () => {
            // console.log('EDIT USER ',input)
            Swal.fire({
              icon: 'success',
              title: `Usuario editado correctamente `,
              showConfirmButton: true,
              // timer: 2000
            })
            // history.push(`/panel/detail/user/${session.id}`);
          })
          .catch(e=>console.log(e));

      //  }
      } else if (action === 'create') {
        if (errors === '') {
          return Swal.fire({
            icon: 'warning',
            title: `Revisar campos requeridos`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          return addUserService(id, input).then(  () => {
            Swal.fire({
              icon: 'success',
              title: `Usuario ${input.name} agregado correctamente `,
              showConfirmButton: true,
            })
          })
          .catch(e=>console.log(e));
        }
      }
    }
  }

  function resetForm() {
    setInput({
      phone: '', city: '', street_number: '', zip_code: '',
    });
    document.getElementById('form').reset();
  }

  return (
    <div className={style.ctn}>
      {!loading &&
        <>
          <EditButtonBar rol={session.type ? session.type : 'user'} handleSubmit={handleSubmit} element="user" id={id} />
          <form onSubmit={handleSubmit} className={style.form} id="form">
            <div className={style.btnReset}>
              <button className={style.btn} type="button" onClick={(e) => resetForm(e)}>
                <FontAwesomeIcon icon={faEraser} />
                {'  Borrar'}
              </button>
            </div>
            <div className={style.field}>
              <label htmlFor="name">Nombre</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            {errors.name && (<p className={style.pdanger}>{errors.name}</p>)}
            <div className={style.field}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                disabled={!isAdmin}
                type="text"
                value={input.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            {errors.email && (<p className={style.pdanger}>{errors.email}</p>)}
            {isAdmin &&
              <>
                <div className={style.field}>
                  <label htmlFor="type">Rol</label>
                  <select className={style.selectFilter} name="type" value={input.type} onChange={handleChange}>
                    {['User', 'Admin', 'SuperAdmin'].map((type, i) => (<option key={i} value={type}>{type}</option>))}
                  </select>
                </div>
                {errors.type && (<p className={style.pdanger}>{errors.type}</p>)}
              </>
            }
            <div className={style.field}>
              <label htmlFor="phone">Teléfono móvil</label>
              <input
                type="text"
                value={input.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className={style.field}>
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                value={input.city}
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className={style.field}>
              <label htmlFor="street_number">Dirección</label>
              <input
                type="text"
                value={input.street_number}
                name="street_number"
                onChange={handleChange}
              />
            </div>
            <div className={style.field}>
              <label htmlFor="zip_code">Código postal</label>
              <input
                type="text"
                value={input.zip_code}
                name="zip_code"
                onChange={handleChange}
              />
            </div>
          </form>
        </>
      }
      {loading && <Loading />}

    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(EditUser);
