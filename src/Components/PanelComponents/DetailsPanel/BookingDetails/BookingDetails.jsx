import React, { useState, useEffect } from 'react';
import { getBookingService } from '../../../../Services/booking.service'
import styles from './BookingDetails.module.css';
import Logo from '../../../../images/blue_slim/logoCirculo.png';

export default function BookingDetails({ id }) {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  
  useEffect(() => {
    getBookingService(id).then(
      res => {
        setBooking( res.data.booking);
        setLoading(false);
      }
    )
      .catch(e => console.error("Error: ", e.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.logo} src={Logo} alt='logo' />
          <div className={styles.headerText}>
            <h1>Booking</h1>
            <h3>my house app s.r.l</h3>
          </div>

        </div>
        <hr />

        <div className={styles.bodyBooking}>
          <div className={styles.bodyBookingHeader} >
            <label>{booking.status}</label> &nbsp;&nbsp;
            <label> { new Date(booking.date).toLocaleDateString("es-ES")}</label>
          </div>
          <div>
            <label>Lugar: </label>&nbsp;&nbsp;
            <label> {booking.post.city}</label>
          </div>
          <div>
            <label>Estado de la publicación: </label>&nbsp;&nbsp;
            <label>{booking.post.status}</label>
          </div>
          <hr style={{margin:'1%'}}/>
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
          <hr style={{margin:'1%'}}/>
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
    );
  }
}
