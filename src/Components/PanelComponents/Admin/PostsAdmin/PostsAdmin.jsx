/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAdminData, deletePost } from '../../../../Redux/Actions/index';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import TablePage from '../../TablePage/TablePage';
import Paginacion from '../../../Paginacion/Paginacion';
import { sendBookingEmailService } from '../../../../Services/booking.service';

function PostsAdmin({
  session, panelAdmin, getAdminData, deletePost,
}) {
 
  useEffect(() => {
    getAdminData(session.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';
  const {
    render, count, currentPage,
  } = panelAdmin;
  const { posts } = render;
  const list = () => {
    const data = [];
    posts?.forEach((e) => {
      data.push({
        column1: e.post_name,
        displayLink: true,
        link: e.userId,
        column2: e.user?.name,
        column3: e.status,
        id: e.id,
      });
    });
    return data;
  };
  async function deleteAndGet(id, userId) {
    try {
      await deletePost(id)
      const reservas = posts.find(post => post.id === id).visitDates;
      if (reservas?.length) {
        const notificarReservaCanselada = [];
        const bookingsId = reservas.map(booking => booking.id);
        bookingsId.forEach(id => notificarReservaCanselada.push(sendBookingEmailService(id)));
        await Promise.all(notificarReservaCanselada);
      }
      await getAdminData(userId);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {isAdmin &&
        <>
          <TableButtonBar
            rol="admin"
            path="post"
          />
          <TablePage
            tableName="posts"
            columns={['Title', 'User', 'Status']}
            data={list()}
            path="user"
            buttonPath="post"
            deleteAction={deleteAndGet}
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
  getAdminData: (id) => dispatch(getAdminData(id)),
  deletePost: (post) => dispatch(deletePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsAdmin);
