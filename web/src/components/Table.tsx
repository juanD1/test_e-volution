import * as React from 'react';
import Moment from 'react-moment';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBAlert } from 'mdbreact';
import { Task, Priority } from 'src/models/Task';
import { Modal } from './Modal';

interface TableProps {
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

export const Table: React.FC<TableProps> = (props) => {  
  if (props.tasks && props.tasks.length) {
    return (
      <div>
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
                      <MDBBtn name="activedUpdateModal" color="warning" onClick={(e) => props.onClickActiveModal(e, index, task._id)}>Update</MDBBtn>
                      <MDBBtn color="danger" onClick={() => props.deleteTask(task._id ? task._id: '')}>Delete</MDBBtn>
                    </td>
                </tr>
              )
            }
          </MDBTableBody>
        </MDBTable>
        <Modal
        modal={props.activedUpdateModal}
        name="activedUpdateModal"
        title="Update Task"
        principalButton={{
          text: 'Update',
          color: 'warning',
          onClick: () => console.log('update principal button')
        }}
        fields={[
          { 
            typeComponent: 'INPUT',
            name: 'nameTask',
            label: 'Task Name',
            // icon: 'tasks',
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
    </div>
    )
  } else {
    return (
      <div style={{textAlign: 'center', margin: 50}}>
        <MDBAlert color="warning">You don't have tasks</MDBAlert>
      </div>
    )
  }  
}