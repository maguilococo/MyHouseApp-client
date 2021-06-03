/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserData, deleteBooking } from '../../../../Redux/Actions/index';
import TablePage from '../../TablePage/TablePage';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import { getAllBookingByUserService, sendBookingEmailService } from '../../../../Services/booking.service';

function Bookings({ panelUser, getUserData, match, deleteBooking}) {
  const [visitDates, setVisitDates] = useState([])
  const { userId } = match.params;
  const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };

  useEffect(() => {
    getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const list = () => {
    const data = [];
    visitDates?.forEach((e) => {
      data.push({
        column1: new Date(e.date).toLocaleDateString("es-ES", options).toLocaleUpperCase().replace('.', ''),//e.date,
        displayLink: true,
        link: e.postId,
        column2: e.post.post_name,
        column3: e.status,
        id: e.id,
      });
    });
    return data;
  };

  useEffect(() => {
    getAllBookingByUserService(userId).then(res=>{
      setVisitDates(res.data.bookings);
    })
    .catch(e => console.error(e))
  }, [panelUser]);

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
        tableName="bookings"
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
