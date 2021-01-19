import { inject, injectable } from 'tsyringe';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import { UserInterface } from '../interfaces/UserInterface';
import { HttpError } from '../utils/errors/HttpError';

@injectable()
class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async create(userData: UserInterface): Promise<User> {
        return this.userRepository.createAndSave(userData);
    }

    public async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new HttpError(404, 'User not found');

        return user;
    }
}

export default UserService;
