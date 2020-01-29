import { httpMethods } from 'src/utils/networkLayer/httpMethods';
import { basePaths } from 'src/constants/urls';
import { basicHeaders } from 'src/utils/networkLayer/httpHeaders';
import { Task } from 'src/models/Task';

export const getTasksByUserId = (userId: string) => {
  return {
    method: httpMethods.GET,
    headers: basicHeaders,
    baseURL: basePaths.tasks,
    url: `${userId}`
  };
};

export const createTask = (task: Task) => {
  return {
    method: httpMethods.POST,
    headers: basicHeaders,
    baseURL: basePaths.tasks,
    url: ''
  };
};

export const updateTask = (taskId: string, task: Task) => {
  return {
    method: httpMethods.PUT,
    headers: basicHeaders,
    baseURL: basePaths.tasks,
    url: `${taskId}`
  };
};

export const deleteTask = (taskId: string) => {
  return {
    method: httpMethods.DELETE,
    headers: basicHeaders,
    baseURL: basePaths.tasks,
    url: `${taskId}`
  };
};