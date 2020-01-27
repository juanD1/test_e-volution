import { httpMethods } from 'src/utils/networkLayer/httpMethods';
import { basePaths } from 'src/constants/urls';
import { basicHeaders } from 'src/utils/networkLayer/httpHeaders';
import { Credentials, User } from './types';

export const authenticateUser = (credentials: Credentials) => {
  return {
    method: httpMethods.POST,
    headers: basicHeaders,
    baseURL: basePaths.security,
    url: 'auth/signin',
    data: {
      email: credentials.email,
      password: credentials.password
    }
  };
};

export const createUser = (user: User) => {
  return {
    method: httpMethods.POST,
    headers: basicHeaders,
    baseURL: basePaths.security,
    url: '',
    data: {
      username: user.username,
      email: user.email,
      password: user.password
    }
  };
};