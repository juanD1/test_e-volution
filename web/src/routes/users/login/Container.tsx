import * as React from 'react';
import { LoginPresenter } from './Presenter';
import { defaultValidatorValue, validEmailRegex, validateForm } from 'src/utils/validators/validator';

interface LoginContainerProps {
  history: any;
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
};

class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {
  constructor(props: LoginContainerProps) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    this.redirectToRegister = this.redirectToRegister.bind(this);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: defaultValidatorValue,
        password: defaultValidatorValue
      },
      showPassword: false,
      disabledButton: true
    }
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
        onChangeHandler={this.onChangeHandler}
        onIconClick={this.onIconClick}
        redirectToRegister={this.redirectToRegister}
      />
    );
  }
}

export default LoginContainer