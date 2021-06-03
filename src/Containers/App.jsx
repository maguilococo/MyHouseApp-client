import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import MyHouseRoutes from '../routes';
import Loading from '../Components/Auth0/Loading/loading';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='app'>
      <MyHouseRoutes />
    </div>
  );
}

export default App;
