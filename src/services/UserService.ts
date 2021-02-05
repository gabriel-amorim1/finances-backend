import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import User from '../database/entities/User';
import IUserRepository from '../interfaces/repositories/IUserRepository';
import {
    UserInterface,
    UserRequestGetAllInterface,
} from '../interfaces/UserInterface';
import { buildFilterGetAll } from '../utils/dataBase/filters';
import { buildPaginatedGetAll } from '../utils/dataBase/pagination';
import { HttpError } from '../utils/errors/HttpError';
import * as userView from '../views/users_view';

@injectable()
class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async create(userData: UserInterface): Promise<UserInterface> {
        if (await this.userRepository.findByEmail(userData.email)) {
            throw new HttpError(400, 'Email already registered.');
        }

        const createdUser = await this.userRepository.createAndSave(userData);

        return userView.render(createdUser);
    }

    public async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new HttpError(404, 'User not found');

        return user;
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new HttpError(404, 'Email not found');

        return user;
    }

    public async checkPassword(email: string, password: string): Promise<User> {
        const user = await this.findByEmail(email);

        if (!(await user.checkPassword(password))) {
            throw new HttpError(401, 'Password does no match');
        }

        return user;
    }

    public async getAll(
        queryParams: UserRequestGetAllInterface,
    ): Promise<{ data: User[]; count: number }> {
        const options = buildFilterGetAll(queryParams);

        const users = await this.userRepository.getAll(options);

        return buildPaginatedGetAll(queryParams, users);
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
