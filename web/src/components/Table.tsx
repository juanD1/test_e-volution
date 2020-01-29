import * as React from 'react';
import Moment from 'react-moment';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBAlert } from 'mdbreact';
import { Task } from 'src/models/Task';

interface TableProps {
  tasks: Task[];
  deleteTask(taskId: string): void;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

export const Table: React.FC<TableProps> = (props) => {  
  if (props.tasks && props.tasks.length) {
    return (

      <MDBTable responsive >
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Sequential</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Expired</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {
            props.tasks.map((task: Task, index: any) =>
            <tr key={index}>
                <td>{index}</td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>
                  <Moment format={'MMMM Do YYYY, h:mm:ss a'}>{task.expired}</Moment>
                </td>
                <td>
                  <MDBBtn name="activedUpdateModal" color="warning" onClick={props.onClickActiveModal}>Update</MDBBtn>
                  <MDBBtn color="danger" onClick={() => props.deleteTask(task._id)}>Delete</MDBBtn>
                </td>
              </tr>
            )
          }
        </MDBTableBody>
      </MDBTable>    
    )
  } else {
    return (
      <div style={{textAlign: 'center', margin: 50}}>
        <MDBAlert color="warning">You don't have tasks</MDBAlert>
      </div>
    )
  }  
}