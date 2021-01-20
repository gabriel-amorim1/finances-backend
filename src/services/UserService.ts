import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
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

    public async getAll(): Promise<{ data: User[]; count: number }> {
        const users = await this.userRepository.getAll();

        return users;
    }

    public async update(id: string, userUpdate: UserInterface): Promise<User> {
        const foundUser = await this.findById(id);

        return this.userRepository.update(
            Object.assign(foundUser, { ...userUpdate }),
        );
    }

    public async remove(id: string): Promise<DeleteResult> {
        await this.findById(id);

        return this.userRepository.remove(id);
    }
}

export default UserService;
