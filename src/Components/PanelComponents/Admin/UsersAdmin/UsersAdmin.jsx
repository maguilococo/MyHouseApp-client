/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteUser, getAdminUsersData } from '../../../../Redux/Actions/index';
import TableButtonBar from '../../ButtonsBar/TableButtonBar/TableButtonBar';
import TablePage from '../../TablePage/TablePage';
import Paginacion from '../../../Paginacion/Paginacion';

function PostsAdmin({
  session, panelAdmin, getAdminData, deleteUser,
}) {
  useEffect(() => {
    getAdminData(session.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAdmin = session.type === 'Admin' || session.type === 'SuperAdmin';
  const {
    render, count, currentPage,
  } = panelAdmin;
  const { users } = render;
  const list = () => {
    const data = [];
    users?.forEach((e) => {
      data.push({
        column1: e.email,
        displayLink: true,
        link: e.id,
        column2: e.name,
        column3: e.status === null ? 'Available' : e.status,
        id: e.id,
      });
    });
    return data;
  };
  async function deleteAndGet(id, userId) {
    await deleteUser(id);
    await getAdminData(userId);
  }
  return (
    <div>
      {isAdmin &&
        <>
          <TableButtonBar
            rol="admin"
            path="user"
          />
          <TablePage
            tableName="users"
            columns={['E-mail', 'User name', 'Status']}
            data={list()}
            path="user"
            buttonPath="user"
            deleteAction={deleteAndGet}
          />
          {/* <Paginacion /> */}
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
  deleteUser: () => dispatch(deleteUser()),
  getAdminData: (adminId) => dispatch(getAdminUsersData(adminId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsAdmin);
