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
  requestUpdateTask(taskId: string, task: Task): void;
  requestDeleteTask(taskId: string): void;
}

interface HomeContainerState {
  taskId: string;
  nameTask: string;
  priorityTask: Priority;
  expiredTask: Date;
  activedCreateModal: boolean;
  activedUpdateModal: boolean;
  activedDeleteModal: boolean;
};

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props)   
    this.state = {
      taskId: '',
      nameTask: '',
      priorityTask: Priority.HIGH,
      expiredTask: new Date(),
      activedCreateModal: false,
      activedUpdateModal: false,
      activedDeleteModal: false
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
    this.setState({
      [name]: !value,
      nameTask: '',
      priorityTask: '',
      expiredTask: new Date()
    });

    if(i !== undefined && idHandler) {
      const recordToEdit = this.props.loadedTasks.filter((item, index) => {
        return index === i;
      })[0];
      this.setState({
        taskId: idHandler,
        nameTask: recordToEdit.name,
        priorityTask: recordToEdit.priority,
        expiredTask: new Date(recordToEdit.expired)
      })
    }
  }

  onChangeHandler = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;
    // @ts-ignore: Ignore Type error due to update based on dynamic index
    this.setState({ [name]: value });
  }

  onChangeDateTimeHandler = (dateTime: Date) => {
    this.setState({ expiredTask: dateTime });
  }

  nearstTask = (tasks: Task[]): Task | null => {
    if (this.props.loadedTasks && this.props.loadedTasks.length) {
      const sortedTasks = tasks.sort((a: Task, b: Task) => {
        return new Date(a.expired).getTime() - new Date(b.expired).getTime();
      });   
      return sortedTasks[0]; 
    } else {
      return null;
    }
  }

  logout = () => {
    this.props.requestUserLogout();
    this.props.clearSecurity();
    this.props.clearTasks();
    this.props.history.push('/');
    persistor.purge();
  }

  createTask = (task: Task) => {
    this.props.requestCreateTask(task);
    this.setState({ activedCreateModal: false });
  }

  updateTask = (taskId: string, task: Task) => {
    this.props.requestUpdateTask(taskId, task);
    this.setState({ activedUpdateModal: false });
  }

  deleteTask = (taskId: string) => {
    this.props.requestDeleteTask(taskId);
    this.setState({ activedDeleteModal: false });
  }

  render () {
    return (
      <HomePresenter 
        history={this.props.history}
        loggedUser={this.props.loggedUser}
        tasks={this.props.loadedTasks}
        selectedTaskId={this.state.taskId}
        nameTask={this.state.nameTask}
        priorityTask={this.state.priorityTask}
        expiredTask={this.state.expiredTask}
        activedCreateModal={this.state.activedCreateModal}
        activedUpdateModal={this.state.activedUpdateModal}
        activedDeleteModal={this.state.activedDeleteModal}        
        onClickActiveModal={this.onClickActiveModal}
        onChangeHandler={this.onChangeHandler}
        onChangeDateTimeHandler={this.onChangeDateTimeHandler}
        nearstTask={this.nearstTask}        
        logout={this.logout}
        createTask={this.createTask}
        updateTask={this.updateTask}
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
    requestUpdateTask: (taskId: string, task: Task) => {
      dispatch(actions.tasks.updateTaskRequest(taskId, task));
    },
    requestDeleteTask: (taskId: string) => {
      dispatch(actions.tasks.deleteTaskRequest(taskId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);