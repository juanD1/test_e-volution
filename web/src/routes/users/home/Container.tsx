import * as React from 'react';
import { connect } from 'react-redux';
import actions from 'src/state/actions';
import selectors from 'src/state/selectors';
import { persistor } from 'src/state/store';
import { LoggedUser } from 'src/state/security/types';
import { Task, Priority } from 'src/models/Task';

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
  requestCreateTask(task: Task): void;
  requestDeleteTask(taskId: string): void;
}

interface HomeContainerState {
  taskId: string;
  nameTask: string;
  priorityTask: Priority;
  expiredTask: Date;
  activedCreateModal: boolean;
  activedUpdateModal: boolean;
};

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props)
    this.onClickActiveModal = this.onClickActiveModal.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeDateTimeHandler = this.onChangeDateTimeHandler.bind(this);    
    this.logout = this.logout.bind(this);
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);    
    this.state = {
      taskId: '',
      nameTask: '',
      priorityTask: Priority.HIGH,
      expiredTask: new Date(),
      activedCreateModal: false,
      activedUpdateModal: false
    }
  }

  componentDidMount() {
    const { loggedUser } = this.props;
    if (loggedUser) {
      this.props.requestGetTaskByUserId(loggedUser.id);
    }
  }

  onClickActiveModal = (e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string) => {
    const { name } = e.currentTarget;
    const cloneState = Object(this.state);
    const value = cloneState[name]
    // @ts-ignore: Ignore Type error due to update based on dynamic index
    this.setState({ [name]: !value});

    console.log('<i> ', i);
    console.log('<id>>', idHandler);
    if(i !== undefined && idHandler) {
      const recordToEdit = this.props.loadedTasks.filter((item, index) => {
        console.log('index', index);
        return index === i;
      })[0];
      console.log('recordToEdit', recordToEdit);
      this.setState({
        taskId: idHandler,
        nameTask: recordToEdit.name,
        priorityTask: recordToEdit.priority,
        expiredTask: new Date(recordToEdit.expired)
      })
    }
  }

  onChangeHandler = (e: React.FormEvent<any>) => {
    console.log(e);
    const { name, value } = e.currentTarget;
    // @ts-ignore: Ignore Type error due to update based on dynamic index
    this.setState({ [name]: value });
  }

  onChangeDateTimeHandler = (dateTime: Date) => {
    this.setState({ expiredTask: dateTime });
  }

  logout() {
    this.props.requestUserLogout();
    this.props.clearSecurity();
    this.props.clearTasks();
    this.props.history.push('/');
    persistor.purge();
  }

  createTask(task: Task) {
    const activedCreateModal = false;
    this.props.requestCreateTask(task);
    this.setState({ activedCreateModal });
  }

  deleteTask(taskId: string) {
    this.props.requestDeleteTask(taskId);
  }

  render () {
    return (
      <HomePresenter 
        history={this.props.history}
        loggedUser={this.props.loggedUser}
        tasks={this.props.loadedTasks}
        nameTask={this.state.nameTask}
        priorityTask={this.state.priorityTask}
        expiredTask={this.state.expiredTask}
        activedCreateModal={this.state.activedCreateModal}
        activedUpdateModal={this.state.activedUpdateModal}        
        onClickActiveModal={this.onClickActiveModal}
        onChangeHandler={this.onChangeHandler}
        onChangeDateTimeHandler={this.onChangeDateTimeHandler}
        logout={this.logout}
        createTask={this.createTask}
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
    requestCreateTask: (task: Task) => {
      dispatch(actions.tasks.createTaskRequest(task));
    },
    requestDeleteTask: (taskId: string) => {
      dispatch(actions.tasks.deleteTaskRequest(taskId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);