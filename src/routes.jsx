import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Pages/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import SideMenu from './Components/NavBar/SideMenu/SideMenu';
import Details from './Pages/Details/Details';
import About from './Pages/About/About';
import Signin from './Pages/Signin/Signin';
import PanelRoutes from './Pages/Panel/PanelRoutes';
import NotFound from './Pages/NotFound/NotFound';
import MercadoPago from './Components/MercadoPago/MercadoPago';
import CreatePostContext from './Pages/NewPost/Contexts/CreatePostContext';
import ProgressBar from './Pages/NewPost/ProgressBar';
import ProtectedRoute from './Components/Auth0/ProtectedRoute/ProtectedRoute';
import Successful from './Pages/Successful/Successful'
import Landing from './Pages/Landing/Landing';
import Footer from './Components/Footer/Footer';

export default function MyHouseRoutes() {
  // React state to know if display mobile menu
  const [mobile, setMobile] = React.useState(false);
  // Function to toggle menu
  const isMobile = () =>{ setMobile(!mobile) };

  // Menu will be display in all routes
  return (
    <Router>
      <div>
        <SideMenu mobile={mobile} isMobile={isMobile} />
        <NavBar isMobile={isMobile}/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          {/* <Route path="/maps" component={Render}/> */}
          <Route path="/home" render={() => <Home mobile={mobile} />} />
          <Route
            exact path="/post/:id"
            render={(routerPops) => <Details routerProps={routerPops} />}
          />
          <ProtectedRoute
            exact path='/create'
            component={(routerProps) => (
             <CreatePostContext {...routerProps}>
                <ProgressBar />
              </CreatePostContext>
            )}
          />
          <Route
            exact path="/about"
            component={About}
          />
          <Route
            exact path="/signin"
            component={Signin}
          />
          <Route
            path="/panel"
            component={PanelRoutes}
          />
          <ProtectedRoute
            exact path="/Success/:planId/:planTitle"
            component={Successful}
          />
          <Route
            component={NotFound}
            />
        </Switch>
         <Footer/> 
      </div>
    </Router>
  );
}
