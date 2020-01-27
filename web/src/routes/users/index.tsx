import * as React from 'react';
import { match } from 'react-router-dom';
import HomeContainer from './home/Container';
import PrivateRoute from 'src/containers/PrivateRoute';

export interface HomeProps {
  match: match<{}>;
}

export class UsersRoutes extends React.Component<HomeProps, {}> {
  render() {
    return (
      <div>
        <PrivateRoute path={`${this.props.match.url}/home`} component={HomeContainer} />        
      </div>
    );
  }
}