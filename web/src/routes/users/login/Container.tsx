import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'src/state/actions';
import selectors from 'src/state/selectors';
import { LoggedUser } from 'src/state/security/types';
import { LOGIN_SUCCESS } from 'src/state/security/constants';
import { Credentials } from 'src/models/Credentials';

import { LoginPresenter } from './Presenter';
import { defaultValidatorValue, validEmailRegex, validateForm } from 'src/utils/validators/validator';


interface LoginContainerProps {
  history: any;
  isAuthenticated: boolean;
  securityError: boolean;
  errorMessage: string;
  actionType: string;
  loggedUser: LoggedUser;
  requestLogin(obj: {}): void;
  clearLoginFailure(): void;
}

interface LoginContainerState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
  showPassword: boolean;
  disabledButton: boolean;
  errorMessage: string;
};

class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {
  constructor(props: LoginContainerProps) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    this.onAuthenticateClick = this.onAuthenticateClick.bind(this);    
    this.redirectToRegister = this.redirectToRegister.bind(this);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: defaultValidatorValue,
        password: defaultValidatorValue
      },
      showPassword: false,
      disabledButton: true,
      errorMessage: ''
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push({
        pathname: '/user/home'
      });
    }      
  }

  componentDidUpdate(prevProps: LoginContainerProps ) {
    if (prevProps.actionType !== this.props.actionType) {
      if (this.props.actionType === LOGIN_SUCCESS) {
        this.props.history.push({
          pathname: '/user/home'
        });
      }
    }

    if (prevProps.securityError !== this.props.securityError) {
      if (this.props.securityError) {
      this.setState({ errorMessage: this.props.errorMessage });
      }
    }
  }

  onAuthenticateClick() {
    const {email, password} = this.state;
    this.props.clearLoginFailure();
    this.props.requestLogin({ email, password });
  }

  onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    let errors = this.state.errors;

    switch (name) {
      case 'email':
        if ( value === '') {
          errors.email = defaultValidatorValue;
        } else {
          errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        }
        break;
      case 'password': 
        if ( value === '') {
          errors.password = defaultValidatorValue;
        } else {
          errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
        }
        break;
      default:
        break;
    }
    // @ts-ignore: Ignore Type error due to update based on dynamic index
    this.setState({ errors, [name]: value, disabledButton: validateForm(errors)});        
  }

  onIconClick(e: React.SyntheticEvent<MouseEvent>) {
    this.setState({showPassword: !this.state.showPassword});    
  }

  redirectToRegister(e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>){
    this.props.history.push(`/register`)
  }

  render () {
    return (
      <LoginPresenter
        history={this.props.history}
        email={this.state.email}
        password={this.state.password}
        errors={this.state.errors}
        showPassword={this.state.showPassword}
        disabledButton={this.state.disabledButton}
        errorMessage={this.state.errorMessage}
        onChangeHandler={this.onChangeHandler}
        onIconClick={this.onIconClick}
        onAuthenticateClick={this.onAuthenticateClick}
        redirectToRegister={this.redirectToRegister}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: selectors.security.isAuthenticated(state),
  securityError: selectors.security.securityError(state),
  loggedUser: selectors.security.loggedUser(state),
  errorMessage: selectors.security.errorMessage(state),  
  actionType: selectors.security.securityAction(state)
});

function mapDispatchToProps(dispatch: Function) {
  return {
    requestLogin: (credentials: Credentials) => {
      dispatch(actions.security.loginRequest(credentials));
    },    
    clearLoginFailure: () => {
      dispatch(actions.security.clearLoginFailure());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));