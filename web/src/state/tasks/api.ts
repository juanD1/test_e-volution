import { httpMethods } from 'src/utils/networkLayer/httpMethods';
import { basePaths } from 'src/constants/urls';
import { basicHeaders } from 'src/utils/networkLayer/httpHeaders';
import { LoadedTask } from './types';

export const getTasksByUserId = (userId: string) => {
  return {
      method: httpMethods.GET,
      headers: basicHeaders,
      baseURL: basePaths.tasks,
      url: `${userId}`
  };
};