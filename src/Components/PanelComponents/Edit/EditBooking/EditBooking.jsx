import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getBookingService, editBookingService, sendBookingEmailService } from '../../../../Services/booking.service'
import styles from '../../DetailsPanel/BookingDetails/BookingDetails.module.css';
import Logo from '../../../../images/blue_slim/logoCirculo.png';
import EditButtonBar from '../../ButtonsBar/EditButtonBar/EditButtonBar';
import Loading from '../../../Auth0/Loading/loading';
import Swal from 'sweetalert2';

export default function EditBooking({ id, action }) {
  const { session } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [oldBookingStatus, setOldBookingStatus] = useState('')

  useEffect(() => {
    getBookingService(id).then(
      res => {
        setBooking(res.data.booking);
        setOldBookingStatus(res.data.booking.status);
        setLoading(false);
      }
    )
      .catch(e => console.error("Error: ", e.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChange(e) {
    e.preventDefault();
    // cambio el estado tambien tengo que cambiar la fecha
    setBooking(
      {
        ...booking,
        [e.target.name]: e.target.value,
        date: new Date(),
      }
    )
  }

  async function handleSubmit() {
    if (oldBookingStatus===booking.status) {
      return Swal.fire({
        icon: 'info',
        title: `No se han realizado modificaciones`,
        timer: 1500
      })
    }
    return editBookingService(id, booking).then(  () => {
            Swal.fire({
              icon: 'success',
              title: `La reserva fue actualiada correctamente`,
              text: `Se notificó a la contraparte sobre este cambio`,
              showConfirmButton: true,
              // timer: 2000
            })
          })
          .then( ()=>{
            // avisar a todos
            sendBookingEmailService(id);
          })
          .catch(e=>console.error(e));
  }

  if (loading) {
    return <Loading />//<div>Cargando...</div>
  } else {
    return (
      <Fragment>
        <EditButtonBar rol={session.type ? session.type : 'user'} handleSubmit={handleSubmit} element="user" id={id} />
        <div className={styles.container}>
          <div className={styles.header}>
            <img className={styles.logo} src={Logo} alt='logo' />
            <div className={styles.headerText}>
              <h1>Booking</h1>
              <h3>MY HOUSE APP S.R.L</h3>
            </div>

          </div>
          <hr style={{ margin: '1%' }}/>

          <div className={styles.bodyBooking}>
            <div className={styles.bodyBookingHeader} >
              <select className={styles.selectStatus} name= 'status' value={booking.status} onChange={evento => { handleChange(evento) }}>
                {['Confirmed', 'Pending', 'Expired', 'Cancelled'].map(orden =>
                  (<option key={orden} value={orden}>{orden}</option>))
                }
              </select>&nbsp;&nbsp;
              <label> {new Date(booking.date).toLocaleDateString("es-ES")}</label>
            </div>
            <div>
              <label>Lugar: </label>&nbsp;&nbsp;
              <label> {booking.post.city}</label>
            </div>
            <div>
              <label>Estado de la publicación: </label>&nbsp;&nbsp;
              <label>{booking.post.status}</label>
            </div>
            <hr style={{ margin: '1%' }} />
            <h2>Datos del propietario</h2>
            <div>
              <label>Nombre</label>&nbsp;&nbsp;
              <label>{booking.owner.name}</label>
            </div>
            <div>
              <label>Telefono</label>&nbsp;&nbsp;
              <label>{booking.owner.phone}</label>
            </div>
            <div>
              <label>Email</label>&nbsp;&nbsp;
              <label>{booking.owner.email}</label>
            </div>
            <hr style={{ margin: '1%' }} />
            <h2>Datos del interesado</h2>
            <div>
              <label>Nombre</label>&nbsp;&nbsp;
              <label>{booking.interested.name}</label>
            </div>
            <div>
              <label>Telefono</label>&nbsp;&nbsp;
              <label>{booking.interested.phone}</label>
            </div>
            <div>
              <label>Email</label>&nbsp;&nbsp;
              <label>{booking.interested.email}</label>
            </div>
          </div>

        </div>
      </Fragment>
    );

  }
}
