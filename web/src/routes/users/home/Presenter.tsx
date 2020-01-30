import * as React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { ManagerTasks } from 'src/components/ManagerTasks';
import { Modal } from 'src/components/Modal';
import { LoggedUser } from 'src/state/security/types';
import { Task, Priority } from 'src/models/Task';

interface HomePresenterProps {
  history: any;
  loggedUser: LoggedUser;
  tasks: Task[];
  nameTask: string;
  priorityTask: Priority;
  expiredTask: Date;
  activedCreateModal: boolean;
  activedUpdateModal: boolean;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string): void;
  onChangeHandler(e: React.FormEvent<any>): void;
  onChangeDateTimeHandler(dateTime: Date): void;
  logout(): void;
  createTask(task: Task): void;
  deleteTask(taskId: string): void;
}

export const HomePresenter: React.FunctionComponent<HomePresenterProps> = props => {
  return (
    <div>
      <div style={{height: `${props.tasks ? '30vh' : '70vh'}`, backgroundColor: 'cyan'}}>
        <MDBBtn tag="a" size="lg" floating gradient="blue" style={{float: 'right'}} onClick={props.logout}>
          <MDBIcon icon="sign-out-alt" />
        </MDBBtn>
        Hola soy el Home
      </div>
      <ManagerTasks 
        tasks={props.tasks}
        nameTask={props.nameTask}
        priorityTask={props.priorityTask}
        expiredTask={props.expiredTask}
        activedUpdateModal={props.activedUpdateModal}
        onClickActiveModal={props.onClickActiveModal}
        onChangeHandler={props.onChangeHandler}
        onChangeDateTimeHandler={props.onChangeDateTimeHandler}
        deleteTask={props.deleteTask}
      />
      <Modal
        modal={props.activedCreateModal}
        name="activedCreateModal"
        title="Create Task"
        principalButton={{
          text: 'Create',
          color: 'success',
          onClick: () => props.createTask({ 
            userId: props.loggedUser.id,
            name: props.nameTask,
            priority: props.priorityTask,
            expired: props.expiredTask
          })
        }}
        fields={[
          { 
            typeComponent: 'INPUT',
            name: 'nameTask',
            label: 'input',
            icon: 'tasks',
            type: 'text',
            value: props.nameTask,
            onChangeHandler: props.onChangeHandler
          },
          { 
            typeComponent: 'SELECT',
            name: 'priorityTask',
            label: 'input',
            icon: 'tasks',
            type: 'text',
            options: [
              { value: Priority.HIGH },
              { value: Priority.MEDIUM },
              { value: Priority.LOW }
            ],
            value: props.priorityTask,
            onChangeHandler: props.onChangeHandler
          },
          {
            typeComponent: 'DATETIMEPICKER',
            name: 'expiredTask',
            type: 'component',
            dateTimevalue: props.expiredTask,
            onChangeHandler: props.onChangeDateTimeHandler
          }
        ]}
        toggle={props.onClickActiveModal}
      />
      {/* <Modal
        modal={props.activedUpdateModal}
        name="activedUpdateModal"
        title="Update Task"
        principalButton={{
          text: 'Update',
          color: 'warning',
          onClick: () => console.log('update principal button')
        }}
        toggle={props.onClickActiveModal}
      /> */}
    </div>
  );
}