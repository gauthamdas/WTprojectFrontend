import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ component: Component, setAuth: isLogged, setAuthLoading: isLoading, socket : soc,  ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component setAuth={isLogged} setAuthLoading={isLoading} Socket={soc} {...props} /> : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}

export default PublicRoute;