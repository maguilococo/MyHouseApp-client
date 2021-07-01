import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import style from '../ButtonsBar.module.css';
import Swal from 'sweetalert2';

function DetailButtonBar({ rol, id, postOwnerId, path, userId, deleteAction }) {
  let diccionario = {
    posts: 'publicación',
    bookings: 'reserva'
  }
  return (
    <div className={style.ctn}>
      <div className={style.elementsCtn}>
      <div className={style.back}>
          <Link to={`/panel/${rol}`}>
            <label>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className={style.text}>Panel</span>
            </label>
          </Link>
        </div>
        {(postOwnerId===userId || !postOwnerId) &&
          /* si no soy el dueño de la publicación no puedo editarla ni eliminarla 
          userId es el de la sesión, id puede ser un booking o post o user
          */
        <div className={style.btnCtn}>
          {id !== userId &&
            <button type="button" className={style.btnBar} onClick={() => {
              Swal.fire({
                title: 'Estas seguro?',
                text: 'Se notificará a todos los interesados sobre esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteAction(id, userId);
                  Swal.fire(
                    'Eliminado!',
                    `Su ${diccionario[window.location.pathname.split('/').slice(-2)[0]]} ha sido eliminada`,//'Your file has been deleted.',
                    'success'
                  )}});
            }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              {'  Eliminar'}
            </button>
          }
          <Link to={`/panel/${path}/${id}/edit`} className={style.btnBar}>
            <FontAwesomeIcon icon={faEdit} />
            {' Editar'}
          </Link>
        </div>
        }
      </div>
    </div>
  );
}

export default DetailButtonBar;
