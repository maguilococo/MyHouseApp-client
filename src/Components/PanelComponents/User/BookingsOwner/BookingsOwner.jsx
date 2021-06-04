/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserData, deleteBooking } from '../../../../Redux/Actions/index';
import TablePage from '../../TablePage/TablePage';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import { sendBookingEmailService } from '../../../../Services/booking.service';

function BookingsOwner({ panelUser, getUserData, match, deleteBooking }) {
  const { userId } = match.params;
  const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };

  useEffect(() => {
    getUserData(userId);
    // console.log('Booking owner')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { render } = panelUser;
  const { posts } = render;
  const list = () => {
    // console.log('Booking owner: ', posts)
    // console.log('render: ', render)
    const data = [];
    posts?.map((p) => p.visitDates?.forEach((e) => {
      data.push({
        column1: new Date(e.date).toLocaleDateString("es-ES", options).toLocaleUpperCase().replace('.', ''),//e.date,
        displayLink: true,
        link: p.postId,
        column2: p.post_name,
        column3: p.status,
        id: e.id,
      });
    }));
    return data;
  };

  function deleteAndUpdate(bookingId) {
    try {
      deleteBooking(bookingId);
      sendBookingEmailService(bookingId);
      getUserData(userId) 
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <TableButtonBar 
        rol="user"
        path="booking"
      />
      <TablePage
        deleteAction={(id)=>deleteAndUpdate(id)}
        tableName="owner bookings"
        columns={['Fecha', 'Publicación', 'Estado']}
        data={list()}
        path="post"
        buttonPath="booking"
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  panelUser: state.panelUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: (userId) => dispatch(getUserData(userId)),
  deleteBooking: (booking) => dispatch(deleteBooking(booking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingsOwner);
