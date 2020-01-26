import * as React from 'react';
import { RegisterPresenter } from './Presenter';
import { defaultValidatorValue, validEmailRegex, validateForm } from 'src/utils/validators/validator';

interface RegisterContainerProps {
  history: any;
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
};

class RegisterContainer extends React.Component<RegisterContainerProps, RegisterContainerState> {
  constructor(props: RegisterContainerProps) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.redirectToLogin = this.redirectToLogin.bind(this);
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
      disabledButton: true,
      errorMessage: ''
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
    const {password, confirmPassword} = this.state;
    let errorMessage = '';
    // e.preventDefault()
    if (confirmPassword !== password) {
      errorMessage = 'Passwords do not match';
    }
    this.setState({ errorMessage });
    // if(this.validateForm(this.state.errors)) {
    //   console.info('Valid Form')
    // }else{
    //   console.error('Invalid Form')
    // }
  }

  redirectToLogin(e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>){
    this.props.history.push('/');
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
        onChangeHandler={this.onChangeHandler}
        handleSubmit={this.handleSubmit}
        redirectToLogin={this.redirectToLogin}
      />
    );
  }
}

export default RegisterContainer