import * as React from 'react';
import moment from 'moment';
import { MDBContainer, MDBDataTable, MDBBtn, MDBAlert } from 'mdbreact';
import { Task, Priority } from 'src/models/Task';
import { LoggedUser } from 'src/state/security/types';
import { Modal } from './Modal';

interface TableProps {
  tasks: Task[];
  loggedUser: LoggedUser;
  selectedTaskId: string;
  nameTask: string;
  priorityTask: Priority | String;
  expiredTask: Date;
  activedUpdateModal: boolean;
  activedDeleteModal: boolean;
  onClickActiveModal(e: React.SyntheticEvent<HTMLButtonElement>, i?: number, idHandler?: string): void;
  onChangeHandler(e: React.FormEvent<any>): void;
  onChangeDateTimeHandler(dateTime: Date): void;
  updateTask(taskId: string, task: Task): void;
  deleteTask(taskId: string): void;
}

export const Table: React.FC<TableProps> = props => {
  const data = {
    columns: [
      {
        label: 'Task Name',
        field: 'name',
        sort: 'disabled',
      },
      {
        label: 'Priority',
        field: 'priority',
        sort: 'asc',
      },
      {
        label: 'Expired',
        field: 'expired',
        sort: 'asc',
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'disabled',
      },
    ],
    rows:
      props.tasks &&
      props.tasks.map((task: Task, index: any) => {
        return {
          name: task.name,
          priority: task.priority,
          expired: moment(task.expired).format('MMMM Do YYYY, h:mm:ss a'),
          actions: (
            <div>
              <MDBBtn
                name="activedUpdateModal"
                color="warning"
                onClick={e => props.onClickActiveModal(e, index, task._id)}
              >
                Update
              </MDBBtn>
              <MDBBtn
                name="activedDeleteModal"
                color="danger"
                onClick={e => props.onClickActiveModal(e, index, task._id)}
              >
                Delete
              </MDBBtn>
            </div>
          ),
        };
      }),
  };

  if (props.tasks && props.tasks.length) {
    return (
      <div style={{ margin: 6 }}>
        <MDBContainer>
          <MDBDataTable striped bordered small data={data} />
        </MDBContainer>
        <Modal
          modal={props.activedUpdateModal}
          name="activedUpdateModal"
          title="Update Task"
          principalButton={{
            text: 'Update',
            color: 'warning',
            onClick: () =>
              props.updateTask(props.selectedTaskId, {
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
              label: 'Task Name',
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
        <Modal
          modal={props.activedDeleteModal}
          name="activedDeleteModal"
          title="Delete Task"
          principalButton={{
            text: 'Delete',
            color: 'danger',
            onClick: () => props.deleteTask(props.selectedTaskId),
          }}
          fields={[
            {
              typeComponent: 'TEXT',
              name: 'activedDeleteModal',
              label: 'You are going to delete this task \n Are you sure?',
            },
          ]}
          toggle={props.onClickActiveModal}
        />
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', margin: 50 }}>
        <MDBAlert color="warning">You don't have tasks</MDBAlert>
      </div>
    );
  }
};
