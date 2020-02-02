import { injectable, inject } from 'inversify';
import SERVICE_IDENTIFIER from '../dependency_injection/constants/Identifiers';
import { UserRepository } from '../repositories/UserRepository';
import { User} from '../models/User';
import { fillErrorResponse } from '../handlers/errorHandler';
import { EMAIL_ALREADY_EXISTS, INTERNAL_SERVER_ERROR, INVALID_CREDENTIALS} from '../common/constants/errorConstants';
import { encryptPassword } from '../utils/EncryptPassword';

@injectable()
export default class UserService {

  @inject(SERVICE_IDENTIFIER.UserRepository) private userRepository: UserRepository;

  constructor() {}

  async createUser(user: User): Promise<User> {
    try {
      const foundUser = await this.userRepository.findOnebyQuery({email: user.email});
      if (foundUser) {
        return Promise.reject(fillErrorResponse(409, EMAIL_ALREADY_EXISTS, 'There is an existing account related to this email address'));
      }

      const passwordEncrypted = await encryptPassword.encryptPassword(user.password);
      user.password = passwordEncrypted;
      const createdUser: User = await this.userRepository.create(user);

      return Promise.resolve(createdUser);
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }

  async authenticateUser(user: User): Promise<User> {
    try {
      const foundUser = await this.userRepository.findOnebyQuery({ email: user.email });
      if (foundUser && await encryptPassword.comparePassword(user.password, foundUser.password)) {
        return Promise.resolve(foundUser);                
      } else {
        return Promise.reject(fillErrorResponse(401, INVALID_CREDENTIALS, 'Invalid user name or password.', 'Invalid user name or password.'));
      }
    } catch (error) {
      return Promise.reject(fillErrorResponse(500, INTERNAL_SERVER_ERROR, 'Internal server error', error));
    }
  }    
}