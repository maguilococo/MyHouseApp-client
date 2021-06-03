import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import photo from '../../../../images/imageProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faMapMarkerAlt,
  faCity,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons';
import style from './UserDetails.module.css';
import { deleteUserService, getUserDataService } from '../../../../Services/user.service';
import Loading from '../../../Auth0/Loading/loading';
import DetailButtonBar from '../../ButtonsBar/DetailButtonBar/DetailButtonBar';

function UserDetails({ session, id }) {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser(id) {
      const userInfo = await getUserDataService(id);
      setUserDetails(userInfo.data.user);
      setLoading(false);
    }
    fetchUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);

  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';

  if (!userDetails.photo) userDetails.photo = photo;
  if (!userDetails.street_number) userDetails.street_number = ' - ';
  if (!userDetails.city) userDetails.city = ' - ';
  if (!userDetails.phone) userDetails.phone = ' - ';
  if (!userDetails.type) userDetails.type = 'User';
  if (!userDetails.status) userDetails.status = 'Available';
  return (
    <>
      {!loading && (
        <>
          <DetailButtonBar
            rol={session.type}
            id={id}
            path='user'
            userId={session.id}
            deleteAction={deleteUserService}
          />
          <div className={style.ctn}>
            <div className={style.divImg}>
              <img src={userDetails.photo} alt='foto' className={style.img} />
            </div>
            <div className={style.divInfo}>
              <h1>{userDetails.name}</h1>
              <h4>{`E-mail: ${userDetails.email}`}</h4>
              <h4>
                <FontAwesomeIcon icon={faCity} />{' '}
                {` Ciudad: ${userDetails.city}`}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                {` Dirección: ${userDetails.street_number}`}
              </h4>
              <h4>
                <FontAwesomeIcon icon={faPhone} />{' '}
                {` Teléfono móvil: ${userDetails.phone}`}
              </h4>
              {isAdmin && (
                <h4>
                  <FontAwesomeIcon icon={faUserTag} />
                  {` Rol: ${userDetails.type}`}
                </h4>
              )}
              <h4>{`Estado: ${userDetails.status}`}</h4>
            </div>
          </div>
        </>
      )}
      {loading && <Loading />}
    </>
  );
}
const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(UserDetails);
