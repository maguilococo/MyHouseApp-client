/* eslint-disable no-shadow */
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faRulerCombined,
} from '@fortawesome/free-solid-svg-icons';
import { FaCheck } from 'react-icons/fa';
import {
  deletePostService,
  getPostService,
} from '../../../../Services/properties.service';
import SliderCarousel from '../../../SliderCarousel/SliderCarousel';
import Map from '../../../GoogleMaps/GoogleMap'; // esta no se esta usando, se puede eliminar? @rennygalindez
import DetailButtonBar from '../../ButtonsBar/DetailButtonBar/DetailButtonBar';
import styles from './PostDetails.module.css';
import { sendBookingEmailService } from '../../../../Services/booking.service';
import { getUserData } from '../../../../Redux/Actions';
import Loading from '../../../Auth0/Loading/loading';

function PostDetails({ session, id }) {
  const [property, setProperty] = useState('');
  const [loading, setLoading] = useState(true);
  let history = useHistory();
  useEffect(() => {
    async function fetchApi(propertyId) {
      const propertyFetch = await getPostService(propertyId);
      setProperty(propertyFetch.data);
      setLoading(false);
    }
    fetchApi(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function deleteAndGet(postId, userId) {
    try {
      await deletePostService(postId)
      const reservas = property.visitDates;
      if (reservas?.length) {
        const notificarReservaCanselada = [];
        const bookingsId = reservas.map(booking => booking.id);
        bookingsId.forEach(id => notificarReservaCanselada.push(sendBookingEmailService(id)));
        await Promise.all(notificarReservaCanselada);
      }
      history.push(`/panel/user/${session.id}/posts`);
      await getUserData(userId);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      <DetailButtonBar
        rol={session.type}
        id={id}
        postOwnerId={property.userId}
        path='post'
        userId={session.id}
        deleteAction={()=>deleteAndGet(id, session.id)}
      />
      {!loading && (
        <main className={styles.container}>
          <div className={styles.status}>
            <h4>{property.status}</h4>
          </div>
          <section className={styles.title}>
            <div>
              <h1>{property.post_name}</h1>
              <p>{property.prop_type}</p>
            </div>
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
                <p className={styles.price}>{`$${new Intl.NumberFormat(
                  'de-DE'
                ).format(property.price)}`}</p>
                <p>{property.description}</p>
              </div>
            </article>
          </div>

          <section className={styles.map_facilities}>
            <article className={styles.map_container}>
              <div>
                {property.latitude && property.longitude && (
                  <Map
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
                )}
              </div>
            </article>
            <article className={styles.facilities_container}>
              <h3 className={styles.tit}>Facilities</h3>
              <div className={styles.facilities}>
                {property.parking_lot && (
                  <div className={styles.facility}>
                    COCHERA
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.gym && (
                  <div className={styles.facility}>
                    GYM
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.elevator && (
                  <div className={styles.facility}>
                    ASCENSOR
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.garden && (
                  <div className={styles.facility}>
                    JARDIN
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.backyard && (
                  <div className={styles.facility}>
                    PATIO
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.private_security && (
                  <div className={styles.facility}>
                    SEGURIDAD
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.pool && (
                  <div className={styles.facility}>
                    PISCINA
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
                {property.bbq && (
                  <div className={styles.facility}>
                    BARBECUE
                    <span className={styles.icon}>
                      <FaCheck />
                    </span>
                  </div>
                )}
              </div>
            </article>
          </section>
        </main>
      )}
      {loading && <Loading />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(PostDetails);
