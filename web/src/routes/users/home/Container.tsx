import * as React from 'react';
import { connect } from 'react-redux';
import actions from 'src/state/actions';
import selectors from 'src/state/selectors';
import { persistor } from 'src/state/store';
import { LoggedUser } from 'src/state/security/types';
import { Task } from 'src/models/Task';

import { HomePresenter } from './Presenter';

interface HomeContainerProps {
  history: any;
  loggedUser: LoggedUser;
  loadedTasks: Task[];
  requestUserLogout(): void;
  requestGetTaskByUserId(userId: string): void;
}

interface HomeContainerState {
};

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props)
    this.logout = this.logout.bind(this);
    this.state = {      
    }
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    console.log('hola', loggedUser);
    if (loggedUser) {
      this.props.requestGetTaskByUserId(loggedUser.id);
    }
  }

  logout() {
    this.props.requestUserLogout();
    this.props.history.push('/');
    persistor.purge();
  }

  render () {
    return (
      <HomePresenter 
        history={this.props.history}
        tasks={this.props.loadedTasks}
        logout={this.logout}       
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  loggedUser: selectors.security.loggedUser(state),
  loadedTasks: selectors.tasks.loadedTasks(state) 
});

function mapDispatchToProps(dispatch: Function) {
  return {
    requestUserLogout: () => {
      dispatch(actions.security.logoutRequest());
    },
    requestGetTaskByUserId: (userId: string) => {
      dispatch(actions.tasks.getTasksRequest(userId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);