/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import SliderCarousel from '../../Components/SliderCarousel/SliderCarousel';
import { getPostService } from '../../Services/properties.service';
import { getUserDataService } from '../../Services/user.service';
import { addBookingService, sendBookingEmailService } from '../../Services/booking.service';
import styles from './Details.module.css';
import GoogleMap from '../../Components/GoogleMaps/GoogleMap';
import Share from '../../Components/Share/Share';
import Swal from 'sweetalert2';

export default function Details({ routerProps }) {
  const { id } = routerProps.match.params;
  const [property, setProperty] = useState('');
  const [loading, setLoading] = useState(true);
  const [wasBooking, setWasBooking] = useState(false);
  const { session } = useSelector((state) => state);
  const [propertyOwner, setPropertyOwner] = useState({});
  
  useEffect(() => {
    async function fetchApi(id) {
      const propertyFetch = await getPostService(id);
      // console.log('propertyFetch.data: ', propertyFetch.data.userId)
      setProperty(propertyFetch.data);
      setPropertyOwner(propertyFetch.data.userId);
      setLoading(false);
    }
    fetchApi(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  async function itPostWasBooking() {
    let userInteresed = await getUserDataService(session.id);
    userInteresed = userInteresed.data.user;
    if (!userInteresed) return;
    const visitDates = userInteresed.visitDates
    if (!!visitDates.filter(booking => booking.postId === id && booking.status !== 'Expired').length) {
      setWasBooking(true);
    }
  }
  useEffect(() => {
    itPostWasBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('session.id', session.id);
    console.log('property', property);
    console.log('property owner', property.userId);
  }, [])

  async function handleReservar(e) {
    Swal.showLoading();
    if (wasBooking) {
      Swal.close();
      Swal.fire({
        icon: 'warning',
        title: 'Ya lo has reservado!',
        showConfirmButton: true,
      })

      document.getElementById("label-message").style.color = "red";
      document.getElementById("label-message").style.fontWeight = "bold";
      return;
    }

    if (!session.id) {
      Swal.close();
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión para hacer una reserva!',
        showConfirmButton: true,
      })

      return;// redirigir a login?
    }
    const booking = {
      idPost: property.id,
      idInterested: session.id,
      title: 'Primera reserva creada',
    }
    try {
      const respuesta = await addBookingService(booking);
      console.log('respuesta status: ', respuesta.status)
      if (respuesta.status >= 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo no fue bien!',
          footer: 'Puede intentarlo más tarde'
        })
      }
      await sendBookingEmailService(respuesta.data.booking.id)
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Su reserva ha sido creada exitosamente!',
        showConfirmButton: true,
      })


      setWasBooking(true);

    } catch (error) {
      console.error('respuesta: ', error.message);
    }
  }

  return (
    <div>
      {!loading && (
        <main className={styles.container}>
          <section className={styles.title}>
            <div>
              <h1>{property.post_name}</h1>
              <p>{property.prop_type}</p>
            </div>
            <Share className={styles.share} />
          </section>
          <article className={styles.hero_carousel}>
            <div className={styles.photo_gallery}>
              <SliderCarousel elementsContainer={property.images} />
            </div>
          </article>
          <div className={styles.ctnDetails}>
            <article className={styles.details}>
              <div className={styles.divDetails}>
                <section>
                  <span className={styles.dicon}>
                    <FontAwesomeIcon icon={faRulerCombined} />
                  </span>
                  {` ${property.m2} m²`}
                </section>
                <label>Área construida</label>
              </div>
              <div className={styles.divDetails2}>
                <div>
                  <section>
                    {property.rooms}
                    <span className={styles.dicon}>
                      <FontAwesomeIcon icon={faBed} />
                    </span>
                  </section>
                  <label>Habitaciones</label>
                </div>
                <div>
                  <section>
                    {property.bathrooms}
                    <span className={styles.dicon}>
                      <FontAwesomeIcon icon={faBath} />
                    </span>
                  </section>
                  <label>Baños</label>
                </div>
                <div>
                  <section>
                    {property.stratum}
                  </section>
                  <label>Estrato</label>
                </div>
              </div>
            </article>

            <article className={styles.address_detail}>
              <div>
                <h2>{`${property.department}, ${property.city}`}</h2>
                <p>{property.neighborhood}</p>
                <p className={styles.price}>{`$${new Intl.NumberFormat('de-DE').format(property.price)}`}</p>
                <p>{property.description}</p>
              </div>
            </article>
          </div>
          <div className={styles.divReservation}>
            <div className={styles.divTitle}>
              ¡Estoy Interesado!
            </div>
            <article className={styles.tour_schedule}>
              <div className={styles.details2}>
                <h3>Agenda tu cita</h3>
                {wasBooking && <label id='label-message' style={{ color: 'green' }}>Ya lo has reservado!</label>}
                {session.id !== propertyOwner ?
                  <button id='btn-reservar' type="submit" onClick={handleReservar}>Select</button> :
                  <button disabled='true' style={{ backgroundColor: 'gray', cursor: 'default' }} type="submit" >Select</button>
                }
              </div>
            </article>
          </div>


          <section className={styles.map_facilities}>
            <article className={styles.map_container}>
              <div>
                {(property.latitude && property.longitude) &&
                  <GoogleMap
                    lat={property.latitude}
                    lng={property.longitude}
                    allowAddress={property.allowAddress}
                    mapElement={
                      <div style={{ height: `350px`, width: '600px' }} />
                    }
                    containerElement={
                      <div style={{ height: '350px', width: '600px' }} />
                    }
                  />
                }
              </div>
            </article>

            <article className={styles.facilities_container}>
              <h3 className={styles.tit}>Instalaciones</h3>
              <div className={styles.facilities}>
                {property.parking_lot && (
                  <div className={styles.facility}>
                    COCHERA
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.gym && (
                  <div className={styles.facility}>
                    GYM
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.elevator && (
                  <div className={styles.facility}>
                    ASCENSOR
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.garden && (
                  <div className={styles.facility}>
                    JARDIN
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.backyard && (
                  <div className={styles.facility}>
                    PATIO
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.private_security && (
                  <div className={styles.facility}>
                    SEGURIDAD
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.pool && (
                  <div className={styles.facility}>
                    PISCINA
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
                {property.bbq && (
                  <div className={styles.facility}>
                    BARBECUE
                    <span className={styles.icon}><FaCheck /></span>
                  </div>
                )}
              </div>
            </article>
          </section>

        </main>
      )}
      {loading && <div>Cargando...</div>}
    </div>
  );
}
