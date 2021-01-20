import { v4 } from 'uuid';

import User from '../../../database/entities/User';
import IUserRepository from '../../../interfaces/repositories/IUserRepository';
import { UserInterface } from '../../../interfaces/UserInterface';

export default class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async createAndSave(userData: UserInterface): Promise<User> {
        const user = Object.assign(new User(), userData);

        user.id = v4();
        user.created_at = new Date();
        user.updated_at = new Date();

        this.users.push(user);

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.id === id);

        return userFound;
    }
}
