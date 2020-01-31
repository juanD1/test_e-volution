import * as React from 'react';
import { MDBContainer, MDBBtn } from 'mdbreact';
import { Task, Priority } from 'src/models/Task';
import { LoggedUser } from 'src/state/security/types';
import { Table } from 'src/components/Table';

interface ManagerTasksProps {
  tasks: Task[];
  loggedUser: LoggedUser;
  selectedTaskId: string
  nameTask: string;
  priorityTask: Priority;
  expiredTask: Date;
  activedUpdateModal: boolean;
  activedDeleteModal: boolean;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string): void;
  onChangeHandler(e: React.FormEvent<any>): void;
  onChangeDateTimeHandler(dateTime: Date): void;
  updateTask(taskId: string, task: Task): void;
  deleteTask(taskId: string): void;
}

export const ManagerTasks: React.FunctionComponent<ManagerTasksProps> = props => {
  return (
    <MDBContainer>
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'grid'}}>
            <MDBBtn name="activedCreateModal" color="info" onClick={props.onClickActiveModal}>Create Task</MDBBtn>
          </div>      
        <Table 
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
      </div>
    </MDBContainer>
  )
}