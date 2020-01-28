import * as React from 'react';
import { MDBBtn } from 'mdbreact';
import { Task } from 'src/models/Task';
import { Table } from 'src/components/Table';

interface ManagerTasksProps {
  tasks: Task[];
}

export const ManagerTasks: React.FunctionComponent<ManagerTasksProps> = props => {
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{display: 'grid'}}>
        <MDBBtn color="info">Create Task</MDBBtn>
      </div>
      <Table tasks={props.tasks}/>
    </div>
  )
}