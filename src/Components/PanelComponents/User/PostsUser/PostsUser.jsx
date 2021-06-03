/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserData, deletePost } from '../../../../Redux/Actions/index';
import TablePage from '../../TablePage/TablePage';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import { sendBookingEmailService } from '../../../../Services/booking.service';

function PostsUser({
  panelUser, getUserData, match, deletePost,
}) {
  const { render } = panelUser;
  const { posts } = render;
  const { userId } = match.params;
  const postsAvailable = posts.filter(post => post.active);
  useEffect(() => {
    getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = () => {
    const data = [];
    postsAvailable.forEach((e) => {
      data.push({
        column1: new Intl.NumberFormat('de-DE').format(e.price),
        displayLink: true,
        link: e.id,
        column2: e.post_name,
        column3: e.status,
        id: e.id,
      });
    });
    return data;
  };
  async function deleteAndGet(postId, userId) {
    try {
      await deletePost(postId)
      const reservas = postsAvailable.find(post => post.id === postId).visitDates;
      if (reservas?.length) {
        const notificarReservaCanselada = [];
        const bookingsId = reservas.map(booking => booking.id);
        bookingsId.forEach(id => notificarReservaCanselada.push(sendBookingEmailService(id)));
        await Promise.all(notificarReservaCanselada);
      }
      await getUserData(userId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <TableButtonBar
        rol="user"
        path="post"
      />
      <TablePage
        userId={userId}
        deleteAction={deleteAndGet}
        tableName="posts"
        columns={['Precio', 'Título', 'Estado']}
        data={list()}
        path="post"
        buttonPath="post"
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  panelUser: state.panelUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: (userId) => dispatch(getUserData(userId)),
  deletePost: (post) => dispatch(deletePost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsUser);
