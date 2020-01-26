import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBModalFooter, MDBAlert } from 'mdbreact';
import { defaultValidatorValue, validateStyle } from 'src/utils/validators/validator';

interface RegisterPresenterProps {
  history: any;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  disabledButton: boolean;
  errorMessage: string;
  onChangeHandler(e: React.FormEvent<HTMLInputElement>): void;
  handleSubmit(e: React.FormEvent<HTMLButtonElement>): void;  
  redirectToLogin(e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>): void;  
}

export const RegisterPresenter: React.FunctionComponent<RegisterPresenterProps> = props => {
  return (
    <MDBContainer
      style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)" }}
    >
      <MDBRow>
        <MDBCol lg="3" md="3" sm="3" xs="3"/>
        <MDBCol lg="6" md="6" sm="6" xs="6">
          <form>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                name='username'
                className={validateStyle(props.errors.username)}
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                value={props.username}
                onChange={props.onChangeHandler}
              > 
                {props.errors.username !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.username}</small>}
              </MDBInput>
              <MDBInput
                name='email'
                className={validateStyle(props.errors.email)}
                label="Your email"
                icon="envelope"
                group
                type="email"
                value={props.email}
                onChange={props.onChangeHandler}
              > 
                {props.errors.email !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.email}</small>}
              </MDBInput>
              <MDBInput
                name='password'
                className={validateStyle(props.errors.password)}
                label="Your password"
                icon="lock"
                group
                type="password"
                value={props.password}
                onChange={props.onChangeHandler}
              > 
                {props.errors.password !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.password}</small>}
              </MDBInput>
              <MDBInput
                name='confirmPassword'
                className={validateStyle(props.errors.confirmPassword)}
                label="Confirm your password"
                icon="exclamation-triangle"
                group
                type="password"
                value={props.confirmPassword}
                onChange={props.onChangeHandler}
              > 
                {props.errors.confirmPassword !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.confirmPassword}</small>}
              </MDBInput>
            </div>
            <div className="text-center">
              <MDBBtn color="primary" disabled={props.disabledButton} onClick={props.handleSubmit}>Login</MDBBtn>
              {props.errorMessage.length > 0 && <MDBAlert color="danger">{props.errorMessage}</MDBAlert>}
            </div>
          </form>
          <MDBModalFooter>
            <div className="font-weight-light">
              <p style={{paddingLeft: 5, color: '#5a95f5', cursor: 'pointer'}} onClick={props.redirectToLogin}>Go to login</p>
            </div>
          </MDBModalFooter>
        </MDBCol>
        <MDBCol lg="3" md="3" sm="3" xs="3" />
      </MDBRow>      
    </MDBContainer>
  );
}