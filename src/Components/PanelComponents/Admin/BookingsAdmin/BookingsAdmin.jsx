/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteBooking, getAdminBookingsData } from '../../../../Redux/Actions/index';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import TablePage from '../../TablePage/TablePage';
import Paginacion from '../../../Paginacion/Paginacion';
import { sendBookingEmailService } from '../../../../Services/booking.service';

function BookingsAdmin({
  session, panelAdmin, getAdminData, deleteBooking,
}) {
  const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
  useEffect(() => {
    getAdminData(session.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';
  const {
    render, count, currentPage,
  } = panelAdmin;
  const { bookings } = render;
  const list = () => {
    const data = [];
    bookings?.forEach((e) => {
      data.push({
        column1: e.user.name,
        displayLink: true,
        link: e.postId,
        column2: e.post.post_name,
        // column3: new Date(e.date).toLocaleDateString('es-ES'), //probar esta opcion
        column3: new Date(e.date).toLocaleDateString("es-ES", options).toLocaleUpperCase().replace('.', ''),
        id: e.id,
      });
    });
    return data;
  };
  async function deleteAndGet(bookingId, userId) {
    await deleteBooking(bookingId);
    await sendBookingEmailService(bookingId);
    await getAdminData(userId);
  }
  return (
    <div>
      {isAdmin &&
        <>
          <TableButtonBar
            rol="admin"
            path="booking"
          />
          <TablePage
            deleteAction={deleteAndGet}
            tableName="bookings"
            columns={['Interested user', 'Post', 'Date']}
            data={list()}
            path="user"
            buttonPath="booking"
          />
           {
            count && (
              <Paginacion
                count={count}
                paginaActual={currentPage}
                limit={10}
                path="/panel/admin/users"
                functionNext={() => getAdminData(session.id)}
              />
            )
          }
        </>
      }
        {!isAdmin && <Redirect to="/home" />}
    </div>
  );
}
const mapStateToProps = (state) => ({
  panelAdmin: state.panelAdmin,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  getAdminData: () => dispatch(getAdminBookingsData()),
  deleteBooking: (booking) => dispatch(deleteBooking(booking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingsAdmin);
