import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../../Components/PanelComponents/Dashboard/Dashboard';
import PostsAdmin from '../../Components/PanelComponents/Admin/PostsAdmin/PostsAdmin';
import UsersAdmin from '../../Components/PanelComponents/Admin/UsersAdmin/UsersAdmin';
import BookingsAdmin from '../../Components/PanelComponents/Admin/BookingsAdmin/BookingsAdmin';
import PostsUser from '../../Components/PanelComponents/User/PostsUser/PostsUser';
import BookingsUser from '../../Components/PanelComponents/User/BookingsUser/BookingsUser';
import BookingsOwner from '../../Components/PanelComponents/User/BookingsOwner/BookingsOwner';
import EditForm from '../../Components/PanelComponents/Edit/EditForm';
import DetailsPanel from '../../Components/PanelComponents/DetailsPanel/DetailsPanel';
import style from './Panel.module.css';
import SideMenu from '../../Components/PanelComponents/SideMenu/SideMenu';
import ProtectedRoute from "../../Components/Auth0/ProtectedRoute/ProtectedRoute";
import CreateForm from '../../Components/PanelComponents/Create/CreateForm';

function PanelRoutes() {
  return (
    <>
      <Switch>
        <div className={style.ctn}>
          <ProtectedRoute  path='/panel' component={SideMenu} />
          {/* <SideMenu/> */}
          <div className={style.divScroll}>
            <ProtectedRoute
              exact
              path="/panel"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/panel/admin"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/panel/admin/posts"
              component={PostsAdmin}
            />
            <ProtectedRoute
              exact
              path="/panel/admin/users"
              component={UsersAdmin}
            />
            <ProtectedRoute
              exact
              path="/panel/admin/bookings"
              component={BookingsAdmin}
            />
            <ProtectedRoute
              exact
              path="/panel/:path/:id/edit" // example for any detail page paths: post, user, booking
              component={EditForm}
            />
            <ProtectedRoute
              exact
              path="/panel/:path/create" // example for any detail page paths: post, user, booking
              component={CreateForm}
            />
            <ProtectedRoute
              exact path="/panel/detail/:path/:id" // example for any detail page paths: post, user, booking
              component={DetailsPanel}
            />
            <ProtectedRoute
              exact
              path="/panel/user"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/panel/user/:userId/posts"
              component={PostsUser}
            />
            <ProtectedRoute
              exact
              path="/panel/user/:userId/bookings"
              component={BookingsUser}
            />
            <ProtectedRoute
              exact
              path="/panel/user/:userId/bookingsowner"
              component={BookingsOwner}
            />
          </div>
        </div>
      </Switch>
    </>
  );
}

export default React.memo(PanelRoutes);
