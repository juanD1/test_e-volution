import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { connect } from 'react-redux';
import selectors from 'src/state/selectors';

interface PrivateRouteProps extends RouteProps {    
  isAuthenticated: boolean;    
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function PrivateRoute({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) {
  return (
      <Route
          {...rest}
          render={(props) => isAuthenticated
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: selectors.security.isAuthenticated(state)
});

export default connect(mapStateToProps)(PrivateRoute);
