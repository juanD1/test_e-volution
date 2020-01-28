import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { TaskRepository } from '../repositories/TaskRepository';
import { Task} from '../models/Task';
import { fillErrorResponse } from '../handlers/errorHandler';
import { INVALID_CREDENTIALS, INTERNAL_SERVER_ERROR } from '../common/constants/errorConstants';

@injectable()
export default class TaskService {

  @inject(SERVICE_IDENTIFIER.TaskRepository) private taskRepository: TaskRepository;

  constructor() {}

  async createTask(task: Task): Promise<Task> {
    try {
      const createdTask: Task = await this.taskRepository.create(task);

      return Promise.resolve(createdTask);
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }

  async getTasks(userId: string): Promise<Task[]> {
    try {
      const foundTasks: Task[] = await this.taskRepository.find({ userId: userId });

      return Promise.resolve(foundTasks);
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }  

  async updateTask(taskId: string, taskNewData: Task): Promise<Task> {
    try {
      taskNewData.expired = new Date(taskNewData.expired);
      const taskToUpdate = await this.taskRepository.findOne(taskId);
      if (taskToUpdate) {
        await this.taskRepository.update(taskId, taskNewData);
        return Promise.resolve(taskNewData);
      }
      else {
        return Promise.reject(fillErrorResponse(401, INVALID_CREDENTIALS, 'Task not found'));
      }
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }

  async deleteTask(taskId: string): Promise<any> {
    try {
      const taskToDelete = await this.taskRepository.findOne(taskId);
      if (taskToDelete) {
        const result = await this.taskRepository.delete(taskId);
        return Promise.resolve(result);
      }
      else {
        return Promise.reject(fillErrorResponse(401, INVALID_CREDENTIALS, 'Task not found'));
      }
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }
}