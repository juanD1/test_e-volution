import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'src/state/actions';
import selectors from 'src/state/selectors';
import { CREATE_USER_SUCCESS } from 'src/state/security/constants';
import { Users } from 'src/models/Users';
import { RegisterPresenter } from './Presenter';
import { defaultValidatorValue, validEmailRegex, validateForm } from 'src/utils/validators/validator';

interface RegisterContainerProps {
  history: any;
  errorMessage: string;
  securityError: boolean;
  actionType: string;
  requestCreateUser(obj: {}): void;
  clearCreateUserFailure(): void;
}

interface RegisterContainerState {
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
  successfullMessage: string;
};

class RegisterContainer extends React.Component<RegisterContainerProps, RegisterContainerState> {
  constructor(props: RegisterContainerProps) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.resetStates = this.resetStates.bind(this);    
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        username: defaultValidatorValue,
        email: defaultValidatorValue,
        password: defaultValidatorValue,
        confirmPassword: defaultValidatorValue
      },
      disabledButton: true ,
      errorMessage: '',
      successfullMessage: ''
    }
  }

  componentDidUpdate(prevProps: RegisterContainerProps ) {
    if (prevProps.actionType !== this.props.actionType) {
      if (this.props.actionType === CREATE_USER_SUCCESS) {
        this.resetStates();
        this.setState({ errorMessage: '', successfullMessage: 'User create successfull'});
        setTimeout(() => { this.setState({ successfullMessage: ''}); }, 2000);
      }
    }

    if (prevProps.securityError !== this.props.securityError) {
      if (this.props.securityError) {
      this.setState({ errorMessage: this.props.errorMessage });
      }
    }
  }

  onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    let errors = this.state.errors;

    switch (name) {
      case 'username': 
        if ( value === '') {
          errors.username = defaultValidatorValue;
        } else {
          errors.username = value.length < 5 ? 'Usernamer must be 5 characters long!' : '';
        }
        break;
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
      case 'confirmPassword': 
        if ( value === '') {
          errors.confirmPassword = defaultValidatorValue;
        } else {
          errors.confirmPassword = value.length < 8 ? 'Password must be 8 characters long!' : '';
        }
        break;
      default:
        break;
    }
    // @ts-ignore: Ignore Type error due to update based on dynamic index
    this.setState({ errors, [name]: value, disabledButton: validateForm(errors)});        
  }

  handleSubmit = (e: React.FormEvent<HTMLSpanElement>) => {
    const {username, email, password, confirmPassword} = this.state;
    if (confirmPassword !== password) {
      const errorMessage = 'Passwords do not match';
      this.setState({ errorMessage });
    } else {
      this.props.clearCreateUserFailure();
      this.props.requestCreateUser({ username, email, password });
    }
  }

  redirectToLogin(e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>){
    this.props.history.push('/');
  }

  resetStates(){
    this.setState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        username: defaultValidatorValue,
        email: defaultValidatorValue,
        password: defaultValidatorValue,
        confirmPassword: defaultValidatorValue
      },
      disabledButton: true
    });
  }  

  render () {
    return (
      <RegisterPresenter 
        history={this.props.history}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        confirmPassword={this.state.confirmPassword}
        errors={this.state.errors}
        disabledButton={this.state.disabledButton}
        errorMessage={this.state.errorMessage}
        successfullMessage={this.state.successfullMessage}        
        onChangeHandler={this.onChangeHandler}
        handleSubmit={this.handleSubmit}
        redirectToLogin={this.redirectToLogin}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  errorMessage: selectors.security.errorMessage(state),  
  securityError: selectors.security.securityError(state),
  actionType: selectors.security.securityAction(state)
});

function mapDispatchToProps(dispatch: Function) {
  return {
    requestCreateUser: (user: Users) => {
      dispatch(actions.security.createUserRequest(user));
    },
    clearCreateUserFailure: () => {
      dispatch(actions.security.clearCreateUserFailure());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));