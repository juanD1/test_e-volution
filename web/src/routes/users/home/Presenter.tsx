import * as React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { ManagerTasks } from 'src/components/ManagerTasks';
import { Task } from 'src/models/Task';

interface HomePresenterProps {
  history: any;
  tasks: Task[];
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
      />
    </div>
  );
}