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
  actionType: string;
  requestUserLogout(): void;
  clearSecurity(): void;
  clearTasks(): void;
  requestGetTaskByUserId(userId: string): void;
  requestDeleteTask(taskId: string): void;
}

interface HomeContainerState {
};

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props)
    this.logout = this.logout.bind(this);
    this.deleteTask = this.deleteTask.bind(this);    
    this.state = {      
    }
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser) {
      this.props.requestGetTaskByUserId(loggedUser.id);
    }
  }

  logout() {
    this.props.requestUserLogout();
    this.props.clearSecurity();
    this.props.clearTasks();
    this.props.history.push('/');
    persistor.purge();
  }

  deleteTask(taskId: string) {
    console.log('deleteTask: ', taskId);
    this.props.requestDeleteTask(taskId);
  }

  render () {
    return (
      <HomePresenter 
        history={this.props.history}
        tasks={this.props.loadedTasks}
        logout={this.logout}
        deleteTask={this.deleteTask}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  loggedUser: selectors.security.loggedUser(state),
  loadedTasks: selectors.tasks.loadedTasks(state),
  actionType: selectors.tasks.taskAction(state) 
});

function mapDispatchToProps(dispatch: Function) {
  return {
    requestUserLogout: () => {
      dispatch(actions.security.logoutRequest());
    },
    clearSecurity: () => {
      dispatch(actions.security.clearSecurity());
    },
    clearTasks: () => {
      dispatch(actions.tasks.clearTasks());
    },
    requestGetTaskByUserId: (userId: string) => {
      dispatch(actions.tasks.getTasksRequest(userId));
    },
    requestDeleteTask: (taskId: string) => {
      dispatch(actions.tasks.deleteTaskRequest(taskId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);