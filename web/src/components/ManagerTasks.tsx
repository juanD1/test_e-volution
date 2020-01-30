import * as React from 'react';
import { MDBBtn } from 'mdbreact';
import { Task, Priority } from 'src/models/Task';
import { Table } from 'src/components/Table';

interface ManagerTasksProps {
  tasks: Task[];
  nameTask: string;
  priorityTask: Priority;
  expiredTask: Date;
  activedUpdateModal: boolean;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string): void;
  onChangeHandler(e: React.FormEvent<any>): void;
  onChangeDateTimeHandler(dateTime: Date): void;
  deleteTask(taskId: string): void;
}

export const ManagerTasks: React.FunctionComponent<ManagerTasksProps> = props => {
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{display: 'grid'}}>
        <MDBBtn name="activedCreateModal" color="info" onClick={props.onClickActiveModal}>Create Task</MDBBtn>
      </div>
      <Table 
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
    </div>
  )
}