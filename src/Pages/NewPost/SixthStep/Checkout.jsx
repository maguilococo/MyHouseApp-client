import React from 'react';
import useCreatePost from '../hooks/useCreatePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faRulerCombined,
} from '@fortawesome/free-solid-svg-icons';
import { FaCheck } from 'react-icons/fa';
import SliderCarousel from '../../../Components/SliderCarousel/SliderCarousel';
import styles from './Checkout.module.css';
import GoogleMap from '../../../Components/GoogleMaps/GoogleMap';


function PostDetails() {
  const { postDetails } = useCreatePost();
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.status}>
          <h4>{postDetails.status}</h4>
        </div>
        <section className={styles.title}>
          <div>
            <h1>{postDetails.post_name}</h1>
            <p>{postDetails.prop_type}</p>
          </div>
        </section>
        <article className={styles.hero_carousel}>
          <div className={styles.photo_gallery}>
            <SliderCarousel elementsContainer={postDetails.images} />
          </div>
        </article>

        <div className={styles.ctnDetails}>
          <article className={styles.details}>
            <div className={styles.divDetails}>
              <section>
              <span className={styles.dicon}>
              <FontAwesomeIcon icon={faRulerCombined} />
              </span>
              {`${postDetails.m2} m²`}
              </section>
              <label>Área construida</label>
            </div>
            <div className={styles.divDetails2}>
            <div>
              <section>
              {postDetails.rooms}
              <span className={styles.dicon}>
              <FontAwesomeIcon icon={faBed} />
              </span>
              </section>
              <label>Habitaciones</label>
            </div>
              <div>
                <section>
                {postDetails.bathrooms}
                <span className={styles.dicon}>
                <FontAwesomeIcon icon={faBath} />
                </span>
                </section>
                <label>Baños</label>
              </div>
              <div>
                <section>
                  {postDetails.stratum}
                </section>
                <label>Estrato</label>
              </div>
            </div>
          </article>

          <article className={styles.address_detail}>
            <div>
              <h2>{`${postDetails.department}, ${postDetails.city}`}</h2>
              <p>{postDetails.neighborhood}</p>
              <p className={styles.price}>{`$${new Intl.NumberFormat(
                'de-DE'
              ).format(postDetails.price)}`}</p>
              <p className={styles.description}>{postDetails.description}</p>
            </div>
          </article>
        </div>

        <section className={styles.map_facilities}>
          <article className={styles.map_container}>
            <div>
              {postDetails.latitude && postDetails.longitude && (
                <GoogleMap
                  lat={postDetails.latitude}
                  lng={postDetails.longitude}
                  allowAddress={postDetails.allowAddress}
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
            <h3 className={styles.tit}>Instalaciones</h3>
            <div className={styles.facilities}>
              {postDetails.parking_lot && (
                <div className={styles.facility}>
                  COCHERA
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.gym && (
                <div className={styles.facility}>
                  GYM
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.elevator && (
                <div className={styles.facility}>
                  ASCENSOR
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.garden && (
                <div className={styles.facility}>
                  JARDIN
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.backyard && (
                <div className={styles.facility}>
                  PATIO
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.security && (
                <div className={styles.facility}>
                  SEGURIDAD
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.pool && (
                <div className={styles.facility}>
                  PISCINA
                  <span className={styles.icon}>
                    <FaCheck />
                  </span>
                </div>
              )}
              {postDetails.bbq && (
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
    </div>
  );
}

export default PostDetails;
