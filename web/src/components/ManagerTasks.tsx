import * as React from 'react';
import { MDBBtn } from 'mdbreact';
import { Task } from 'src/models/Task';
import { Table } from 'src/components/Table';

interface ManagerTasksProps {
  tasks: Task[];
  deleteTask(taskId: string): void;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

export const ManagerTasks: React.FunctionComponent<ManagerTasksProps> = props => {
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{display: 'grid'}}>
        <MDBBtn name="activedCreateModal" color="info" onClick={props.onClickActiveModal}>Create Task</MDBBtn>
      </div>
      <Table 
        tasks={props.tasks}
        onClickActiveModal={props.onClickActiveModal}
        deleteTask={props.deleteTask}
      />
    </div>
  )
}