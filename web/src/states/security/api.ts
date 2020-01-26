import { httpMethods } from 'src/utils/networkLayer/httpMethods';
import { basePaths } from 'src/constants/urls';
import { basicHeaders } from 'src/utils/networkLayer/httpHeaders';

export const authenticateUser = (
  credentials: {
    username: string,
    password: string,
  }) => {
  return {
    method: httpMethods.POST,
    headers: basicHeaders,
    baseURL: basePaths.security,
    url: 'auth/signin',
    data: {
      email: credentials.username,
      password: credentials.password
    }
  };
};