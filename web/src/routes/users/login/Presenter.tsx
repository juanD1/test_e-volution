import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import { defaultValidatorValue, validateStyle } from 'src/utils/validators/validator';

interface LoginPresenterProps {
  history: any;
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
  showPassword: boolean;
  disabledButton: boolean;
  onChangeHandler(e: React.FormEvent<HTMLInputElement>): void;  
  onIconClick(e: React.SyntheticEvent<MouseEvent>): void;
  redirectToRegister(e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>): void;
}

export const LoginPresenter: React.FunctionComponent<LoginPresenterProps> = props => {
  return (
    <MDBContainer
      style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)" }}
    >
      <MDBRow>
        <MDBCol lg="3" md="3" sm="3" xs="3"/>
        <MDBCol lg="6" md="6" sm="6" xs="6">
          <form >
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                name="email"
                className={validateStyle(props.errors.email)}
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value={props.email}
                onChange={props.onChangeHandler}
              > 
                {props.errors.email !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.email}</small>}
              </MDBInput>
              <MDBInput
                name="password"
                className={validateStyle(props.errors.password)}
                label="Type your password"
                icon={props.showPassword ? 'eye' : 'eye-slash'}
                group
                type={props.showPassword ? 'text' : 'password'}
                validate
                value={props.password}
                onChange={props.onChangeHandler}
                onIconClick={props.onIconClick}
              >
                {props.errors.password !== defaultValidatorValue && <small className="invalid-feedback">{props.errors.password}</small>}
              </MDBInput>
            </div>
            <div className="text-center">
              <MDBBtn disabled={props.disabledButton}>Login</MDBBtn>
            </div>
          </form>
          <MDBModalFooter>
            <div className="font-weight-light">
              <p>Not a member? 
                <span 
                  style={{paddingLeft: 5, color: '#2bbbad', cursor: 'pointer'}}
                  onClick={props.redirectToRegister}
                >
                  Sign Up
                </span>                
              </p>
            </div>
          </MDBModalFooter>
        </MDBCol>
        <MDBCol lg="3" md="3" sm="3" xs="3" />
      </MDBRow>      
    </MDBContainer>
  );
}