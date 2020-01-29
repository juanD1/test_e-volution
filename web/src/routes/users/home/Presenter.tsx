import * as React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { ManagerTasks } from 'src/components/ManagerTasks';
import { Modal } from 'src/components/Modal';
import { Task, Priority } from 'src/models/Task';

interface HomePresenterProps {
  history: any;
  tasks: Task[];
  activedCreateModal: boolean;
  activedUpdateModal: boolean;
  // -------
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>): void;
  // -------
  logout(): void;
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
        deleteTask={props.deleteTask}
        onClickActiveModal={props.onClickActiveModal}
      />
      <Modal
        modal={props.activedCreateModal}
        name="activedCreateModal"
        title="Create Task"
        principalButton={{
          text: 'Create',
          color: 'success',
          onClick: () => console.log('create principal button')
        }}
        fields={[
          { 
            typeComponent: 'INPUT',
            name: 'name',
            label: 'name',
            icon: 'tasks',
            type: 'text',
            value: 'name test',
            onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => console.log('onChangeHandler', e)
          },
          { 
            typeComponent: 'SELECT',
            name: 'name',
            label: 'name',
            icon: 'tasks',
            type: 'text',
            options: [
              { value: Priority.HIGH },
              { value: Priority.MEDIUM },
              { value: Priority.LOW }
            ],
            onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => console.log('onChangeHandler', e)
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