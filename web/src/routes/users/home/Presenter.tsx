import * as React from 'react';
import moment from 'moment';
import { MDBBtn, MDBIcon, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { ManagerTasks } from 'src/components/ManagerTasks';
import { Modal } from 'src/components/Modal';
import { LoggedUser } from 'src/state/security/types';
import { Task, Priority } from 'src/models/Task';

interface HomePresenterProps {
  history: any;
  loggedUser: LoggedUser;
  tasks: Task[];
  selectedTaskId: string;
  nameTask: string;
  priorityTask: Priority | String;
  expiredTask: Date;
  activedCreateModal: boolean;
  activedUpdateModal: boolean;
  activedDeleteModal: boolean;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string): void;
  onChangeHandler(e: React.FormEvent<any>): void;
  onChangeDateTimeHandler(dateTime: Date): void;
  nearstTask(tasks: Task[]): Task | null;
  logout(): void;
  createTask(task: Task): void;
  updateTask(taskId: string, task: Task): void;
  deleteTask(taskId: string): void;
}

export const HomePresenter: React.FunctionComponent<HomePresenterProps> = props => {
  const nearstTask = props.nearstTask(props.tasks);
  return (
    <div>
      <div style={{ height: `${props.tasks && props.tasks.length ? '40vh' : '10vh'}` }}>
        <MDBBtn tag="a" size="lg" gradient="blue" style={{ float: 'right' }} onClick={props.logout}>
          <MDBIcon icon="sign-out-alt" />
        </MDBBtn>
        <h1>Welcome {props.loggedUser.username}</h1>
        <div className="d-flex justify-content-center">
          {props.tasks && props.tasks.length ? (
            <MDBCard style={{ width: '22em' }}>
              <MDBCardBody>
                <MDBCardTitle>Nearst Task</MDBCardTitle>
                <MDBCardText>
                  <span>
                    {nearstTask && nearstTask.name} <br />
                    priority <strong>{nearstTask && nearstTask.priority}</strong> <br />
                    Will expire on {nearstTask && moment(nearstTask.expired).format('MMMM Do YYYY, h:mm:ss a')}
                  </span>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ) : null}
        </div>
      </div>
      <ManagerTasks
        tasks={props.tasks}
        loggedUser={props.loggedUser}
        selectedTaskId={props.selectedTaskId}
        nameTask={props.nameTask}
        priorityTask={props.priorityTask}
        expiredTask={props.expiredTask}
        activedUpdateModal={props.activedUpdateModal}
        activedDeleteModal={props.activedDeleteModal}
        onClickActiveModal={props.onClickActiveModal}
        onChangeHandler={props.onChangeHandler}
        onChangeDateTimeHandler={props.onChangeDateTimeHandler}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
      />
      <Modal
        modal={props.activedCreateModal}
        name="activedCreateModal"
        title="Create Task"
        principalButton={{
          text: 'Create',
          color: 'success',
          onClick: () =>
            props.createTask({
              userId: props.loggedUser.id,
              name: props.nameTask,
              priority: props.priorityTask,
              expired: props.expiredTask,
            }),
        }}
        fields={[
          {
            typeComponent: 'INPUT',
            name: 'nameTask',
            label: 'input',
            icon: 'tasks',
            type: 'text',
            value: props.nameTask,
            onChangeHandler: props.onChangeHandler,
          },
          {
            typeComponent: 'SELECT',
            name: 'priorityTask',
            label: 'input',
            icon: 'tasks',
            type: 'text',
            options: [{ value: Priority.HIGH }, { value: Priority.MEDIUM }, { value: Priority.LOW }],
            value: props.priorityTask,
            onChangeHandler: props.onChangeHandler,
          },
          {
            typeComponent: 'DATETIMEPICKER',
            name: 'expiredTask',
            type: 'component',
            dateTimevalue: props.expiredTask,
            onChangeHandler: props.onChangeDateTimeHandler,
          },
        ]}
        toggle={props.onClickActiveModal}
      />
    </div>
  );
};
