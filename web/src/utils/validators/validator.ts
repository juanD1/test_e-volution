export const defaultValidatorValue = 'VALID';
export const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validateStyle = (error: string) => {
  let className;
  if (error === defaultValidatorValue) {
    className = '';
  } else if (error !== defaultValidatorValue && error.length > 0) {
    className = 'is-invalid';
  } else {
    className = 'is-valid';
  }  
  return className;
}

export const validateForm = (errors: Object) => {
  let valid = true;
  let count = 0;
  Object.values(errors).forEach(val => {
    if (val !== defaultValidatorValue && val.length === 0) {
      count++;
    }
    if (count === Object.values(errors).length) {
      valid = false;
    }
  });
  return valid;
}